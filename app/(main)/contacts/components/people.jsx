"use client";
import { User } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import Link from "next/link";

export default function People({ users }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <User className="mr-2 h-5 w-5" />
        People
      </h2>
      {users.length === 0 ? (
        <Card>
          <CardContent className="py-6 text-center text-muted-foreground">
            No contacts yet. Add an expense with someone to see them here.
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <Link key={user.id} href={`/person/${user.id}`}>
              <Card className="hover:bg-muted/30 transition-colors cursor-pointer">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.imageUrl} />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
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
