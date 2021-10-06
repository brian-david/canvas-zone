//import { useSelector } from "react-redux";
import { Rect } from "react-konva";

const Zone = (props:any) => {
    //const { draw } = useSelector((state: any) => state);
    return (
        <Rect
            x={props.x}
            y={props.y}
            height={props.height}
            width={props.width}
            fill="transparent"
            stroke="black"
            draggable={props.draw}
        />
    );
}

export default Zone;