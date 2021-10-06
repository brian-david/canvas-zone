import { configureStore } from '@reduxjs/toolkit';
import { type } from 'os';
import { zoningCanvasSlice } from './reducers/zoningCanvas';
// Import any reducers you wish to add from src/redux/reducers. eg: import UserReducer from 'redux/reducers/user';

const store = configureStore({
   reducer: {
      zoningCanvas : zoningCanvasSlice.reducer,
   }
})

export default store; 
