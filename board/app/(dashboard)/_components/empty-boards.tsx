"use client";

import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";
import { toast } from "sonner";

export const EmptyBoard = () => {
    const { organization } = useOrganization();
    const { mutate, pending } = useApiMutation(api.board.create);

    const onclick = () => {
        if (!organization) return;
        mutate({
            orgId: organization.id,
            title: "Untitled",
        }).then(() => {
            toast.success("Board created");
        }).catch(() => toast.error("Failed to create board"))
    };

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/notes.svg"
                height={400}
                width={400}
                alt="Empty"
                unoptimized
            />
            <h2 className="text-2xl font-semibold mt-6">
                Create your first board!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Starting by creating a board for your organization
            </p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onclick} size="lg">
                    Create board
                </Button>
            </div>
        </div>
    );
};