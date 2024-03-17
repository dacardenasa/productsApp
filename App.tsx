import 'react-native-gesture-handler';
import React from 'react';
import Toast from 'react-native-toast-message';

import Navigator from '@/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppState } from '@/providers';

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppState>
                <Navigator />
                <Toast />
            </AppState>
        </QueryClientProvider>
    );
}
