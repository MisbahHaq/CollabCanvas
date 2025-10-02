import Image from "next/image";
import { CreateOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";

export const EmptyOrg = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image src="/elements.svg" alt="Empty" height={700} width={700} />
            <h2 className="text-2xl font-semibold mt-6">Welcome to Boardy</h2>
            <p className="text-muted-foreground text-sm mt-2">
                Create an organization to get started
            </p>
        </div>
    );
};
