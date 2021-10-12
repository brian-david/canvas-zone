import { configureStore } from '@reduxjs/toolkit';
import { type } from 'os';
import { useDispatch } from 'react-redux';
import { zoningCanvasSlice } from './reducers/zoningCanvas';
// Import any reducers you wish to add from src/redux/reducers. eg: import UserReducer from 'redux/reducers/user';

const store = configureStore({
   reducer: {
      zoningCanvas : zoningCanvasSlice.reducer,
   }
})

export const selectDraw = (state:RootState) => state.zoningCanvas.draw;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store; 
