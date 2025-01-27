'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { type ReactNode, useState } from 'react';
import { type Session } from 'next-auth';
import { BrowserRouter } from 'react-router-dom';

export function Providers({
    children,
    session
}: {
    children: ReactNode;
    session: Session | null;
}) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>{children}</BrowserRouter>
            </QueryClientProvider>
        </SessionProvider>
    );
}
