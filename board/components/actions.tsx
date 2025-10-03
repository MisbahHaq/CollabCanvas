"use client";

import { Link2, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenuContentProps,
} from "@radix-ui/react-dropdown-menu";
import { Children } from "react";
import { toast } from "sonner";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "@/components/confirm-modal";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
}

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title,
}: ActionProps) => {
    const { onOpen } = useRenameModal();
    const { mutate, pending } = useApiMutation(api.board.remove);

    const onCopyLink = () => {
        navigator.clipboard
            .writeText(`${window.location.origin}/board/${id}`)
            .then(() => toast.success("Link copied"))
            .catch(() => toast.error("Failed to copy link"));
    };

    const onDelete = () => {
        mutate({ id })
            .then(() => toast.success("Board deleted"))
            .catch(() => toast.error("Failed to delete board"));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(e) => e.stopPropagation()}
                side={side}
                sideOffset={sideOffset}
                className="w-60"
            >
                <DropdownMenuItem onClick={onCopyLink}>
                    <Link2 />
                    Copy board link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onOpen(id, title)}>
                    <Pencil />
                    Rename
                </DropdownMenuItem>
                <ConfirmModal
                    header="Delete board?"
                    description="This will delete the board and all of its contents."
                    disabled={pending}
                    onConfirm={onDelete}
                >
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Trash2 />
                        Delete board
                    </DropdownMenuItem>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
