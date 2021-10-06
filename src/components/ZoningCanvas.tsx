import React from "react";
import store from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { switchState } from "../redux/reducers/zoningCanvas";

const ZoningCanvas = () => {
    const { draw } = useSelector((state:any) => state.zoningCanvas);
    console.log(useSelector((state:any) => state.zoningCanvas.draw));
    console.log(draw);
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <p>Current canvas state { draw.toString() }</p>
            <button onClick={() => dispatch(switchState())}>Switch State</button>

        </React.Fragment>
    );
};

export default ZoningCanvas