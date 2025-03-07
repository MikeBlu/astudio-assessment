import { configureStore } from "@reduxjs/toolkit";
import recordCountReducer from './recordCount';

export const store = configureStore({
    reducer: {
        recordCount: recordCountReducer
    }
})