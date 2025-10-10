import { shallow } from "@liveblocks/react";

import { Layer, XYWH } from "@/types/canvas";
import { useStorage, useSelf } from "@/liveblocks.config";

const boundingBox = (layers: Layer[]): XYWH | null => {
    const first = layers[0];

    if (!first) {
        return null;
    }

    let left = first.x - first.width / 2;
    let right = first.x + first.width / 2;
    let top = first.y - first.height / 2;
    let bottom = first.y + first.height / 2;

    for (let i = 1; i < layers.length; i++) {
        const { x, y, width, height } = layers[i];

        const layerLeft = x - width / 2;
        const layerRight = x + width / 2;
        const layerTop = y - height / 2;
        const layerBottom = y + height / 2;

        if (left > layerLeft) {
            left = layerLeft;
        }

        if (right < layerRight) {
            right = layerRight;
        }

        if (top > layerTop) {
            top = layerTop;
        }

        if (bottom < layerBottom) {
            bottom = layerBottom;
        }
    }

    return {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top,
    };
};


export const useSelectionBounds = () => {
    const selection = useSelf((me) => me.presence.selection);

    return useStorage((root) => {
        const selectedLayers = selection.map((layerId) => root.layers.get(layerId)!).filter(Boolean);

        return boundingBox(selectedLayers);
    }, shallow);
};