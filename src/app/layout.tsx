import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './lib/auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Providers } from './providers';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app'
};

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
            >
                <Providers session={session}>
                    <Navbar />
                    <main className="flex-1 flex">{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
