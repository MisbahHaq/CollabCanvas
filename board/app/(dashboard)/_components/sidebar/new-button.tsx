"use client";

import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Hint } from "@/components/hint";

export const NewButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    <Hint
                        label="Create Organization"
                        side="right"
                        align="start"
                        sideOffset={20}
                    >
                        <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                            <Plus className="text-white" />
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent
                className="max-w-[480px] w-full p-0 bg-transparent border-none
             [&>button[data-dialog-close]]:hidden"
            >
                <DialogTitle className="sr-only">Create Organization</DialogTitle>
                <div className="relative bg-white rounded-lg shadow-md p-6">
                    <CreateOrganization />
                </div>
            </DialogContent>
        </Dialog>
    );
};
