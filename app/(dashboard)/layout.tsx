"use client";

import { Navbar } from "./_components/navbar";
import { OrgSidebar } from "./_components/org-sidebar";
import { Sidebar } from "./_components/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const { isOpen, close } = useSidebar();

    return <main className="h-full">
        {/* Mobile backdrop */}
        {isOpen && (
            <div
                className="fixed inset-0 bg-black/50 z-[0] lg:hidden"
                onClick={close}
            />
        )}
        <Sidebar />
        <div className={cn(
            "h-full transition-all duration-300 ease-in-out",
            "lg:pl-[60px]",
            isOpen ? "pl-[60px]" : "pl-0 lg:pl-[60px]"
        )}>
            <div className="flex gap-x-3 h-full">
                <OrgSidebar />
                <div className="h-full flex-1">
                    <Navbar />
                    {children}
                </div>
            </div>
        </div>
    </main>;
};

export default DashboardLayout;
