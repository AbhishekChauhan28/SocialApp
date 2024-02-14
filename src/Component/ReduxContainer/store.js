import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import storage from "redux-persist/lib/storage";
//import { getDefaultNormalizer } from "@testing-library/react";

const persistConfig = {
    key: 'root',
    vesion: 1,
    storage,
}

const UserpersistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer: {
        user: UserpersistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializablecheck: {
            ignoreActions: [FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER,]
        },
    }),
})

export let persistor = persistStore(store);