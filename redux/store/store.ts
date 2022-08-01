import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cardSlice from "./reducers/CardSlice";

const rootReducer = combineReducers({
  cardSlice,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']