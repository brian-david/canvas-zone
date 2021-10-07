import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { switchState } from "../redux/reducers/zoningCanvas";
import { Stage, Layer, Rect } from "react-konva";
import Zone from "./Zone";

const ZoningCanvas = () => {
    const { draw, zones } = useSelector((state: any) => state.zoningCanvas);
    const dispatch = useDispatch();
    const [newZone, setNewZone] = useState<any>([]);
    const [newZones, setNewZones] = useState([] as any);
    const [selectedShapeKey, setSelectedShapeKey] = useState<string>("");

    const handleMouseDown = (event: any) => {
        if (!draw) {
            console.log("create a new zone!");
            if (newZone.length === 0) {
                const { x, y } = event.target.getStage().getPointerPosition();
                setNewZone([{ x, y, width: 0, height: 0, key: "0" }]);
            }
        }
        else {
            const clickedOnEmpty = event.target === event.target.getStage();
            if (clickedOnEmpty) {
                setSelectedShapeKey("");
            }
        }
    }

    const handleMouseUp = (e: any) => {
        if (!draw) {
            console.log("Mouse Up, new zone created");
            console.log(zones);
            if (newZone.length === 1) {
                const sx = newZone[0].x;
                const sy = newZone[0].y;
                const { x, y } = e.target.getStage().getPointerPosition();
                const zoneToAdd = {
                    x: sx,
                    y: sy,
                    width: x - sx,
                    height: y - sy,
                    key: zones.length + 1
                };
                newZones.push(zoneToAdd);
                setNewZone([]);
                setNewZones(newZones);
                console.log(newZones);
            }
        }
        else{
            console.log(zones);
            //need to update the storage area for the zones
            //when things change 
        };
    }

    const handleMouseMove = (e: any) => {
        if (!draw) {
            //console.log("making the zones size");
            if (newZone.length === 1) {
                const sx = newZone[0].x;
                const sy = newZone[0].y;
                const { x, y } = e.target.getStage().getPointerPosition();
                setNewZone([
                    {
                        x: sx,
                        y: sy,
                        width: x - sx,
                        height: y - sy,
                        key: "0",
                    }
                ]);
                console.log(newZone);
            }
        }
    }

    const checkDeselect = (e: any) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedShapeKey("");
        }
    };

    const zonesToDraw = [...zones, ...newZones, ...newZone];

    return (
        <React.Fragment>
            <p>Current canvas state {draw.toString()}</p>
            <button onClick={() => dispatch(switchState())}>Switch State</button>
            <Stage
                //drawing tools
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={checkDeselect}
                width={1000}
                height={1000}>
                <Layer>
                    {zonesToDraw.map((zone, i: number) => (
                        <Zone
                            x={zone.x}
                            y={zone.y}
                            height={zone.height}
                            width={zone.width}
                            draw={draw}
                            zoneType={zone.zoneType}

                            isSelected={zone.key === selectedShapeKey}
                            onSelect={() => {
                                setSelectedShapeKey(zone.key);
                                console.log("Zonekey = ", zone.key);
                                console.log("selectedId = ", selectedShapeKey);
                            }}

                            onChange={(newAttrs: any) => {
                                const rects = zonesToDraw.slice();
                                rects[i] = newAttrs;
                                setNewZones(rects);
                            }}
                            key={zone.key}
                        />
                    ))}
                </Layer>
            </Stage>
        </React.Fragment>
    );
};

export default ZoningCanvas

function addZone(zoneToAdd: { x: any; y: any; width: number; height: number; key: any; }): any {
    throw new Error("Function not implemented.");
}
