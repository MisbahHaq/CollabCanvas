"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Hint } from "@/components/hint";
import { useRenameModal } from "@/store/use-rename-modal";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";

interface InfoProps {
    boardId: string;
}

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

const TabSeparator = () => {
    return <div className="text-neutral-300 px-1.5"></div>;
};

export const Info = ({ boardId }: InfoProps) => {
    const { onOpen } = useRenameModal();

    const data = useQuery(api.board.get, {
        id: boardId as Id<"boards">,
    });

    if (!data) return <InfoSkeleton />;

    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1 md:px-1.5 h-10 md:h-12 flex items-center shadow-md max-w-[calc(100vw-1rem)] overflow-hidden">
            <Hint label="Go to boards" side="bottom" sideOffset={10}>
                <Button asChild variant="board" className="px-1 md:px-2">
                    <Link href="/" className="flex items-center">
                        <Image src="/logo.svg" alt="Board logo" height={28} width={28} className="md:h-[35px] md:w-[35px]" />
                        <span
                            className={cn(
                                "font-semibold text-lg md:text-xl ml-1 md:ml-2 text-black hidden sm:inline",
                                font.className
                            )}
                        >
                            Boards
                        </span>
                    </Link>
                </Button>
            </Hint>
            <TabSeparator />
            <Hint label="Edit title" side="bottom" sideOffset={10}>
                <Button
                    variant="board"
                    className="text-sm md:text-base font-normal px-1 md:px-2 truncate max-w-[100px] md:max-w-none"
                    onClick={() => onOpen(data._id, data.title)}
                >
                    {data.title}
                </Button>
            </Hint>
            <TabSeparator />
            <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
                <div>
                    <Hint label="Main menu" side="bottom" sideOffset={10}>
                        <Button size="icon" variant="board">
                            <Menu />
                        </Button>
                    </Hint>
                </div>
            </Actions>
        </div>
    );
};

export const InfoSkeleton = () => {
    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1 md:px-1.5 h-10 md:h-12 flex items-center shadow-md w-[200px] md:w-[300px]" />
    );
};
