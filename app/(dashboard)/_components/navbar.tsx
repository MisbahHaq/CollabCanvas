"use client";

import {
    UserButton,
    useOrganization,
} from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { InviteButton } from "./invite-button";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";

export const Navbar = () => {
    const { organization } = useOrganization();
    const { toggle } = useSidebar();

    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-x-4 gap-y-4 p-4 md:p-5">
            <div className="flex items-center gap-x-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={toggle}
                >
                    <Menu className="h-6 w-6" />
                </Button>
                <div className="flex-1 lg:flex-none">
                    <SearchInput />
                </div>
            </div>
            <div className="flex items-center gap-x-4 lg:ml-auto">
                {organization && <InviteButton />}
                <UserButton />
            </div>
        </div>
    );
};
