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

    const handleMouseDown = (event: any) => {
        if (!draw) {
            console.log("create a new zone!");
            if (newZone.length === 0) {
                const { x, y } = event.target.getStage().getPointerPosition();
                setNewZone([{ x, y, width: 0, height: 0, key: "0" }]);
            }
        }
        else return;
    }

    const handleMouseUp = (e: any) => {
        if (!draw) {
            console.log("Mouse Up, new zone created");
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
        else return;
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
                        key: "0"
                    }
                ]);
                console.log(newZone);
            }
        }
    }

    const zonesToDraw = [...zones, ...newZones, ...newZone];

    return (
        <React.Fragment>
            <p>Current canvas state {draw.toString()}</p>
            <button onClick={() => dispatch(switchState())}>Switch State</button>
            <Stage
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                width={1000}
                height={1000}>
                <Layer>
                    <Rect
                        x={newZone.x}
                        y={newZone.y}
                        width={newZone.width}
                        height={newZone.height}
                        fill="red"
                    />
                    {zonesToDraw.map(zone => (
                        <Zone
                            x={zone.x}
                            y={zone.y}
                            height={zone.height}
                            width={zone.width}
                            draw={draw}
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
