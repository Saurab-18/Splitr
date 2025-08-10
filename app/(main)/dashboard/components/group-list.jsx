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

export default function GroupList() {
  return (
    <>
      <Card>
        <CardHeader className="pb-3 flex items-center justify-between">
          <CardTitle>Your Groups</CardTitle>
          <Button variant={"link"} asChild className="p-0">
            <Link href="/contacts">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link href="/contacts?createGroup=true">
              <Users className="mr-2 h-4 w-4" />
              Create new group
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
