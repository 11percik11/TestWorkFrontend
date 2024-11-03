import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { api } from './services/api';
import {configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import searchReducer from "../componets/searchSlice";

export const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      searchReducer
      // user
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(api.middleware)
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
