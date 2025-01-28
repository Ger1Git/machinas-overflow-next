'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Input from '../components/input/Input';

const LoginPage = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isClient, setIsClient] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const usernameOrEmailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const router = useRouter();
    const { status } = useSession();

    const isLoading = status === 'loading';
    const isAuthenticated = status === 'authenticated';

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/');
        }
    }, [status, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            usernameOrEmail,
            password
        });

        if (result?.error) {
            toast.error('Invalid email or password. Please try again.');
        } else {
            router.push('/');
        }
    };

    if (!isClient) {
        return null;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return null;
    }

    return (
        <div className="flex flex-1 items-center justify-center px-5 py-7 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        id="usernameOrEmail"
                        label="Username or Email"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                        placeholder="Enter your username or email"
                        ref={usernameOrEmailRef}
                    />

                    <div className="relative">
                        <Input
                            type={isPasswordVisible ? 'text' : 'password'}
                            id="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Your password"
                            ref={passwordRef}
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setIsPasswordVisible((prev) => !prev)
                            }
                            className="absolute bottom-[13px] right-3 bg-transparent border-none cursor-pointer"
                        >
                            <Image
                                src={
                                    isPasswordVisible
                                        ? '/hidePassword.svg'
                                        : '/showPassword.svg'
                                }
                                alt={
                                    isPasswordVisible
                                        ? 'Hide Password'
                                        : 'Show Password'
                                }
                                width={24}
                                height={24}
                                className="object-cover"
                            />
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {isAuthenticated ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <a
                        href="/register"
                        className="text-blue-500 hover:text-blue-600"
                    >
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
