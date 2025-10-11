"use client";
import { useOrganization } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";

const DashboardPage = () => {
    console.log('DashboardPage component rendering')
    const { organization } = useOrganization();
    const searchParams = useSearchParams();
    const search = searchParams.get("search");
    const favorites = searchParams.get("favorites");

    const query = {
        search: search || undefined,
        favorites: favorites || undefined,
    };

    return (
        <div className="flex-1 h-[calc(100%-80px)] p-4 md:p-6">
            {!organization ? <EmptyOrg /> : (
                <BoardList
                    orgId={organization.id}
                    query={query} />
            )}
        </div>
    );
};

export default DashboardPage;
