export const getAllContacts = query(async (ctx) => {
  // Use the centralized getCurrentUser instead of duplicating auth logic
  const currentUser = await ctx.runQuery(internal.users.getCurrentUser);

  // personal expenses where YOU are the payer
  const expensesYouPaid = await ctx.db
    .query("expenses")
    .withIndex("by_user_and_group", (q) =>
      q.eq("paidByUserId", currentUser._id).eq("groupId", undefined)
    )
    .collect();

  //  personal expenses where YOU are **not** the payer
  const expensesNotPaidByYou = (
    await ctx.db
      .query("expenses")
      .withIndex("by_group", (q) => q.eq("groupId", undefined)) // only 1-to-1
      .collect()
  ).filter(
    (e) =>
      e.paidByUserId !== currentUser._id &&
      e.splits.some((s) => s.userId === currentUser._id)
  );

  const personalExpenses = [...expensesYouPaid, ...expensesNotPaidByYou];

  // extract unique counterpart IDs
  const contactIds = new Set();
  personalExpenses.forEach((exp) => {
    if (exp.paidByUserId !== currentUser._id) contactIds.add(exp.paidByUserId);

    exp.splits.forEach((s) => {
      if (s.userId !== currentUser._id) contactIds.add(s.userId);
    });
  });

  // fetch user docs
  const contactUsers = await Promise.all(
    [...contactIds].map(async (id) => {
      const u = await ctx.db.get(id);
      return u
        ? {
            id: u._id,
            name: u.name,
            email: u.email,
            imageUrl: u.imageUrl,
            type: "user",
          }
        : null;
    })
  );

  // groups where current user is a member
  const userGroups = (await ctx.db.query("groups").collect())
    .filter((g) => g.members.some((m) => m.userId === currentUser._id))
    .map((g) => ({
      id: g._id,
      name: g.name,
      description: g.description,
      memberCount: g.members.length,
      type: "group",
    }));

  // sort alphabetically
  contactUsers.sort((a, b) => a?.name.localeCompare(b?.name));
  userGroups.sort((a, b) => a.name.localeCompare(b.name));

  return { users: contactUsers.filter(Boolean), groups: userGroups };
});
