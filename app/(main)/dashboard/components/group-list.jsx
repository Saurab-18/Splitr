"use client";
import { ChevronRight, Users } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../../../components/ui/card";
import Link from "next/link";

export default function GroupList({ groups }) {
  return (
    <Card>
      <CardHeader className="pb-3 flex items-center justify-between">
        <CardTitle>Your Groups</CardTitle>
        <Button variant="link" asChild className="p-0">
          <Link href="/contacts">
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent>
        {!groups || groups.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No groups yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Create a group to start tracking shared expenses
            </p>
          </div>
        ) : (
          groups.map((group) => {
            const balance = group.balance || 0;
            const hasBalance = balance !== 0;

            return (
              <Link
                href={`/groups/${group.id}`}
                key={group.id}
                className="flex items-center justify-between hover:bg-muted p-2 rounded-md transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{group.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {group.members.length} members
                    </p>
                  </div>
                </div>

                {hasBalance && (
                  <span
                    className={`text-sm font-medium ${
                      balance > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {balance > 0 ? "+" : ""}${balance.toFixed(2)}
                  </span>
                )}
              </Link>
            );
          })
        )}
      </CardContent>

      <CardFooter>
        <Button variant="outline" asChild className="w-full">
          <Link href="/contacts?createGroup=true">
            <Users className="mr-2 h-4 w-4" />
            Create new group
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
