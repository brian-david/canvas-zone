import { createSlice } from '@reduxjs/toolkit'; //createSlice needs to be imported

export const zoningCanvasSlice = createSlice({ //Create a slice with the file name as prefix
    name: "zoningCanvas", //Give the slice the name of the file
    initialState: {
        draw: true,
        zones: [],
    }, //We can provide an intitial state eg: { Id: 1, Name: "Admin", ... }
    reducers: { //Here the list of actions/reducers need to be added which is going to be exported and called throughout the project
        switchState : (state) => {
            state.draw = (state.draw ? false : true);
        },
    }
})

export const { switchState } = zoningCanvasSlice.actions; //We export the actions to be used in the project.

export default zoningCanvasSlice.reducer; //We need to export the reducer which is being called in the store.tsx file as UsersReducer