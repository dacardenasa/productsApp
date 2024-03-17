import React from 'react';
import { AuthProvider, ProductsProvider } from '@/context';

export const AppState = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>
        <ProductsProvider>{children}</ProductsProvider>
    </AuthProvider>
);
