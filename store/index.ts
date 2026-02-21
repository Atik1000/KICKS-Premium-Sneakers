import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

/**
 * Redux store configuration
 * Includes cart reducer for state management
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;