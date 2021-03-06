import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rect, Transformer } from "react-konva";
import Konva from "konva";
import { updateZone } from "../redux/reducers/zoningCanvas";
import { createAction } from "@reduxjs/toolkit";

const Zone = (props: any) => {
    const { draw, zones } = useSelector((state: any) => state.zoningCanvas);
    const shapeRef = useRef<any>();
    const trRef = useRef<any>();
    const dispatch = useDispatch();

    let zoneColour: string;
    switch (props.zoneType) {
        case "advert": {
            zoneColour = "red";
            break;
        }
        case "headline": {
            zoneColour = "green";
            break;
        }
        default: {
            zoneColour = "black";
            break;
        }
    }

    useEffect(() => {
        if (props.isSelected) {
            if (trRef !== undefined && shapeRef !== undefined) {
                trRef.current.nodes([shapeRef.current]);
                trRef.current.getLayer().batchDraw();
            }
        }
    });

    const updateStore = () => {
        const updatedZone = {
            ...shapeRef.current.attrs,
            index: shapeRef.current.index,
        }
        dispatch(updateZone(updatedZone));
    }

    return (
        <>
            <Rect
                x={props.x}
                ref={shapeRef}
                y={props.y}
                {...props.zoneProps}
                height={props.height}
                width={props.width}
                fill={zoneColour}
                opacity={0.3}
                stroke={"black"}
                strokeWidth={1}
                draggable={props.draw}
                onClick={props.onSelect}
                strokeScaleEnabled={false}
                onDragEnd = {updateStore}
                onTransformEnd={(e) => {
                    console.log("Zoning transform end");
                    const node = shapeRef.current;
                    if (node) {
                        const scaleX = node.scaleX();
                        const scaleY = node.scaleY();
                        node.scaleX(1);
                        node.scaleY(1);
                        props.onChange({
                            ...props.shapeProps,
                            x: node.x(),
                            y: node.y(),
                            width: Math.max(5, node.width() * scaleX),
                            height: Math.max(node.height() * scaleY),
                        });
                    }
                }}
            />

            {props.isSelected && (
                <Transformer
                    ref={trRef}
                    rotateEnabled={false}
                    keepRatio={false}
                    ignoreStroke={true}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </>
    );
}

export default Zone;