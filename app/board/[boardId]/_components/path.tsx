import { getSvgPathFromStroke } from "@/lib/utils";
import getStroke from "perfect-freehand";

interface PathProps {
    x: number,
    y: number,
    points: number[][];
    fill: string;
    onPointerDown?: (e: React.PointerEvent) => void;
    stroke?: string;
};

export const Path = ({
    x,
    y,
    points,
    fill,
    onPointerDown,
    stroke,
}: PathProps) => {
    return (
        <path
            className="drop-shadow-md"
            onPointerDown={onPointerDown}
            d={getSvgPathFromStroke(
                getStroke(points, {
                    size: 16,
                    thinning: 0.7,
                    smoothing: 0.3,
                    streamline: 0.3,
                })
            )}
            transform={`translate(${x} ${y})`}
            fill={fill}
            stroke={stroke}
            strokeWidth={1}
        />
    );
};