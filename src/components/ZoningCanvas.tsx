import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { switchState, addZone, selectZone } from "../redux/reducers/zoningCanvas";
import { Stage, Layer, Rect } from "react-konva";
import Zone from "./Zone";
import store from "../redux/store";

const ZoningCanvas = () => {
    const { draw, zones } = useSelector((state: any) => state.zoningCanvas);
    const dispatch = useDispatch();
    const [newZone, setNewZone] = useState<any>([]);
    //const [newZones, setNewZones] = useState([] as any);
    const [selectedShapeKey, setSelectedShapeKey] = useState<string>("");

    console.log("global zones: ", zones);
    //console.log("newZones: ", newZones);
    console.log("newZone: ", newZone);

    const handleMouseDown = (event: any) => {
        if (!draw) {
            if (newZone.length === 0) {
                const { x, y } = event.target.getStage().getPointerPosition();
                setNewZone([{ x, y, width: 0, height: 0, key: "0" }]);
                console.log("new zone created in 'handleMouseDown'. key: ", newZone.key);
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
            if (newZone.length === 1) {
                const sx = newZone[0].x;
                const sy = newZone[0].y;
                const { x, y } = e.target.getStage().getPointerPosition();
                const zoneToAdd = {
                    x: sx,
                    y: sy,
                    width: x - sx,
                    height: y - sy,
                    key: zones.length + 1,
                    zoneType: "advert",
                };
                //newZones.push(zoneToAdd);
                dispatch(addZone(zoneToAdd));
                setNewZone([]);
                console.log("globally stored zones : ", zones);
            }
        }
        else {
            console.log(zones);
            //
        };
    }

    const handleMouseMove = (e: any) => {
        if (!draw) {
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
            }
        }
    }

    const checkDeselect = (e: any) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedShapeKey("");
            console.log("Nothing Selected");
        }
    };

    const zonesToDraw = [...zones, ...newZone];

    let canvasState = "";
    if (!draw) {
        canvasState = "You can now draw on the canvas";
    } else {
        canvasState = "You can now edit the canvas";
    }

    const updateZone = (newA:any) => {
        console.log(newA)
    }

    return (
        <React.Fragment>
            <p>{canvasState}</p>
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
                        //<></>
                        <Provider store={store}>
                            <Zone
                                x={zone.x}
                                y={zone.y}
                                height={zone.height}
                                width={zone.width}
                                draw={draw}
                                zoneType={zone.zoneType}
                                zoneKey={zone.key}
                                zoneProps={zone}

                                isSelected={zone.key === selectedShapeKey}
                                onSelect={() => {
                                    setSelectedShapeKey(zone.key);
                                }}                    

                                onChange={(newAttrs: any) => {
                                    const rects = zonesToDraw.slice();
                                    rects[i] = newAttrs;
                                    console.log("shape change");
                                    ondragend
                                }}

                                OnDragEnd = {(e:any) => {
                                    console.log("DRAG END - ");;
                                }}
                            />
                        </Provider>
                    ))}
                </Layer>
            </Stage>
        </React.Fragment>
    );
};

export default ZoningCanvas