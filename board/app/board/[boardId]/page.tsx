import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";

interface BoardIdPageProps {
    params: {
        boardId: string;
    };
};

const BoardIdPage = ({
    params,
}: BoardIdPageProps) => {
    return (
        <Canvas boardId={params.boardId} />
    );
};

export default BoardIdPage;