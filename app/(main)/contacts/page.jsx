"use client";
import { BarLoader } from "react-spinners";
import { useConvexQuery } from "../../../hooks/use-convex-query";
import { api } from "../../../convex/_generated/api";
import { Button } from "../../../components/ui/button";
import { useEffect, useState } from "react";
import People from "./components/people";
import Groups from "./components/groups";
import CreateGroupModal from "./components/create-group-modal";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";

export default function Contacts() {
  const [isGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const { data, isLoading, error } = useConvexQuery(
    api.contacts.getAllContacts
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const createGroupParam = searchParams.get("createGroup");
    if (createGroupParam === "true") {
      setIsCreateGroupModalOpen(true);
      const url = new URL(window.location.href);
      url.searchParams.delete("createGroup");
      router.replace(url.pathname + url.search);
    }
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div>
        <BarLoader width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  const { users, groups } = data || { users: [], groups: [] };
  return (
    <>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-5xl gradient-title">Contacts</h1>
          <Button onClick={() => setIsCreateGroupModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <People users={users} />
          <Groups groups={groups} />
        </div>
      </div>
      <CreateGroupModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
        onSucess={(groupId) => router.push(`/groups/${groupId}`)}
      />
    </>
  );
}
