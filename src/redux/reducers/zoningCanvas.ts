import { createSlice } from '@reduxjs/toolkit'; //createSlice needs to be imported

export const zoningCanvasSlice = createSlice({ //Create a slice with the file name as prefix
    name: "zoningCanvas", //Give the slice the name of the file
    initialState: {
        draw: true,
        zones: [
            {
                x: 200,
                y: 200,
                width: 500,
                height: 300,
                key: "A1",
                zoneType: "advert"
            },
            {
                x: 295,
                y: 50,
                width: 100,
                height: 300,
                key: "A2",
                zoneType: "headline"
            },
        ],
    }, //We can provide an intitial state eg: { Id: 1, Name: "Admin", ... }
    reducers: { //Here the list of actions/reducers need to be added which is going to be exported and called throughout the project
        switchState : (state) => {
            state.draw = (state.draw ? false : true);
        },
        addZone : (state, action) => {
            console.log("new zone added to the global store");
            state.zones = [
                ...state.zones,
                action.payload
            ]
            return state;
        },
        updateZone : (state, action) => {
            return {
                ...state,
                zones: state.zones.map((zone, i) => i == action.payload.index? {...zone, x: action.payload.x, y: action.payload.y} : zone)
            }
            
        }
    }
})

export const { switchState, addZone, updateZone } = zoningCanvasSlice.actions; //We export the actions to be used in the project
//export default zoningCanvasSlice; //We need to export the reducer which is being called in the store.tsx file as UsersReducer