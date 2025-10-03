"use client";

import { OrganizationList, useOrganizationList } from "@clerk/nextjs";
import { Item } from "./item";

interface ListProps {
    onItemClick?: () => void;
}

export const List = ({ onItemClick }: ListProps) => {
    const { userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });

    if (!userMemberships.data?.length) return null;

    return (
        <ul className="py-2 space-y-2">
            {userMemberships.data?.map((mem) => (
                <Item
                    key={mem.organization.id}
                    id={mem.organization.id}
                    name={mem.organization.name}
                    imageUrl={mem.organization.imageUrl}
                    onClick={onItemClick}
                />
            ))}
        </ul>
    );
};
