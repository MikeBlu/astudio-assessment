import { configureStore } from "@reduxjs/toolkit";
import recordCountReducer from './recordCount';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const countDataPersistConfig = {
    key: 'recordCount',
    storage: storage,
};

export const store = configureStore({
    reducer: {
        recordCount: persistReducer(countDataPersistConfig, recordCountReducer),
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});