"use client";
import Link from "next/link";
import { Card, CardContent } from "../../../../components/ui/card";
import { Users } from "lucide-react";

export default function Groups({ groups }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Users className="mr-2 h-5 w-5" />
        Groups
      </h2>
      {groups.length === 0 ? (
        <Card>
          <CardContent className="py-6 text-center text-muted-foreground">
            No groups yet. Create a group to start tracking shared expenses.
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {groups.map((group) => (
            <Link key={group.id} href={`/groups/${group.id}`}>
              <Card className="hover:bg-muted/30 transition-colors cursor-pointer">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{group.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {group.memberCount} members
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
