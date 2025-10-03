"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";

interface ItemProps {
    id: string;
    name: string;
    imageUrl: string;
    onClick?: () => void;
}

export const Item = ({ id, name, imageUrl, onClick }: ItemProps) => {
    const { organization } = useOrganization();
    const { setActive } = useOrganizationList();

    const isActive = organization?.id === id;

    const handleClick = () => {
        if (!setActive) return;

        setActive({ organization: id });
        onClick?.();
    };

    return (
        <div className="aspect-square relative">
            <Hint label={name} side="right" align="start" sideOffset={20}>
                <Image
                    fill
                    alt={name}
                    src={imageUrl}
                    onClick={handleClick}
                    className={cn(
                        "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
                        isActive && "opacity-100"
                    )}
                />
            </Hint>
        </div>
    );
};
