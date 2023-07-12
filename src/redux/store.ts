import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import filterReducer from './features/filter/filterSlice';
import userReducer from './features/user/userSlice';
import { api } from './api/apiSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
