"use client";

import { List } from "./list";
import { NewButton } from "./new-button";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
    const { isOpen, close } = useSidebar();

    return (
        <aside className={cn(
            "fixed z-[2] left-0 bg-blue-950 h-full w-[60px] flex p-3 flex-col gap-y-4 text-white transition-transform duration-300 ease-in-out",
            "lg:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}>
            <List onItemClick={close} />
            <NewButton />
        </aside>
    );
};
