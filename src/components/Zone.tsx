import Konva from "konva";
import React from "react";
import { Rect, Transformer } from "react-konva";

const Zone = (props: any, {onSelect}:any) => {
    const shapeRef = React.useRef<any>();
    const trRef = React.useRef<any>();

    const zoneKey = props.key;

    React.useEffect(() => {
        if (props.isSelected) {

            console.log("shape ref = ", shapeRef.current);
			console.log("transformer ref = ", trRef.current);
            
            if (trRef !== undefined && shapeRef !== undefined){
                trRef.current.nodes([shapeRef.current]);
                trRef.current.getLayer().batchDraw();
            }
            
        }
    }, [props.isSelected]);

    return (
        <React.Fragment>
            <Rect
                x={props.x}
                ref={shapeRef}
                y={props.y}
                height={props.height}
                width={props.width}
                fill="transparent"
                stroke="black"
                draggable={props.draw}
                onClick={props.onSelect}
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current;
                    if (node) {
                        const scaleX = node.scaleX();
                        const scaleY = node.scaleY();
                        // we will reset it back
                        node.scaleX(1);
                        node.scaleY(1);
                        props.onChange({
                            ...props.shapeProps,
                            x: node.x(),
                            y: node.y(),
                            // set minimal value
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
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </React.Fragment>
    );
}

export default Zone;