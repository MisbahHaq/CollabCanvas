import { Button } from "@/components/ui/button";
import Image from "next/image";

export const EmptyBoard = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/notes.svg"
                height={400}
                width={400}
                alt="Empty"
                unoptimized
            />
            <h2 className="text-2xl font-semibold mt-6">
                Create your first board!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Starting by creating a board for your organization
            </p>
            <div className="mt-6">
                <Button size="lg">
                    Create board
                </Button>
            </div>
        </div>
    );
};