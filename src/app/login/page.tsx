'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import Input from '../components/input/Input';

const LoginPage = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [focusOn, setFocusOn] = useState<
        null | 'usernameOrEmail' | 'password'
    >(null);
    const router = useRouter();

    const usernameOrEmailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { mutate: handleLogin, status } = useMutation({
        mutationKey: ['login'],
        mutationFn: async () => {
            try {
                const response = await axios.post('/api/auth/login', {
                    usernameOrEmail,
                    password
                });

                return response.data;
            } catch (error: unknown) {
                if (error instanceof AxiosError) {
                    const errorMessage: string =
                        error.response?.data?.message ||
                        'Login failed. Please try again.';

                    toast.error(errorMessage);

                    switch (true) {
                        case errorMessage?.includes('Username or email'):
                            setFocusOn('usernameOrEmail');
                            usernameOrEmailRef.current?.focus();
                            break;
                        case errorMessage?.includes('Password'):
                            setFocusOn('password');
                            passwordRef.current?.focus();
                            break;
                        default:
                            break;
                    }
                } else {
                    toast.error('Login failed. Please try again.');
                }
            }
        },
        onSuccess: () => {
            toast.success('Login successful!');
            router.push('/');
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleLogin();
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const isInputInvalid = (field: string) => focusOn === field;

    return (
        <div className="flex flex-1 items-center justify-center p-5 bg-gray-100">
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
                        error={
                            isInputInvalid('usernameOrEmail')
                                ? 'Invalid username or email'
                                : null
                        }
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
                            error={
                                isInputInvalid('password')
                                    ? 'Invalid password'
                                    : null
                            }
                            ref={passwordRef}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute bottom-[13px] right-3 bg-transparent border-none cursor-pointer"
                        >
                            <img
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
                                className="password-icon h-6 w-6 object-cover"
                            />
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'pending'}
                        className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {status === 'pending' ? 'Logging in...' : 'Login'}
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
