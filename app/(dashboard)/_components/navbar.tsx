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
        <div className="flex items-center gap-x-4 p-4 md:p-5">
            <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={toggle}
            >
                <Menu className="h-6 w-6" />
            </Button>
            <div className="hidden lg:flex lg:flex-1">
                <SearchInput />
            </div>
            <div className="block lg:hidden flex-1">
                {/* OrganizationSwitcher disabled - enable organizations in Clerk dashboard */}
                <div className="w-full max-w-376px p-2 bg-gray-100 rounded-lg text-center text-sm text-gray-600">
                    Organizations disabled
                </div>
            </div>
            <div className="flex items-center gap-x-4">
                {organization && <InviteButton />}
                <UserButton />
            </div>
        </div>
    );
};
