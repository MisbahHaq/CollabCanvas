import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";

interface RectangleProps {
    id: string;
    layer: RectangleLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
};

export const Rectangle = ({
    id,
    layer,
    onPointerDown,
    selectionColor,
}: RectangleProps) => {
    const { x, y, width, height, fill } = layer;

    return (
        <rect
            className="drop-shadow-md"
            onPointerDown={(e) => onPointerDown(e, id)}
            x={x - width / 2}
            y={y - height / 2}
            width={width}
            height={height}
            strokeWidth={1}
            fill={fill ? colorToCss(fill) : "#000"}
            stroke={selectionColor || "transparent"}
        />
    );
};