import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import { persistStore, persistReducer } from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { FLUSH, PAUSE, PERSIST, REGISTER, REHYDRATE, PURGE } from "redux-persist/es/constants"

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
}
const rootReducer = combineReducers({
  user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // warningを防止: https://github.com/rt2zz/redux-persist/issues/988#issuecomment-552242978
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
