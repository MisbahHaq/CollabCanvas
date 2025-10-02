import Image from "next/image";

export const EmptyFavorites = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/empty-favorites.svg"
                height={1150}
                width={1150}
                alt="Empty"
                unoptimized
            />
            <h2 className="text-2xl font-semibold mt-6">
                No favorites Found!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Try favorating a board
            </p>
        </div>
    );
};