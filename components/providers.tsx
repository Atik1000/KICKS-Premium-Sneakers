"use client";

import { Provider } from 'react-redux';
import { store } from '@/store';

/**
 * Redux Provider Component
 * Wraps the application with Redux store
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}