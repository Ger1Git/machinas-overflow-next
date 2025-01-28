'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Input from '../components/input/Input';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [focusOn, setFocusOn] = useState(null);
    const router = useRouter();

    const nameRef = useRef(null);
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const { mutate: handleRegister, isLoading } = useMutation({
        mutationKey: 'register',
        mutationFn: async () => {
            try {
                const response = await axios.post('/api/auth/register', {
                    email,
                    username,
                    password,
                    fullName: name
                });

                return response.data;
            } catch (error) {
                const errorMessage =
                    error.response?.data?.message ||
                    'Registration failed. Please try again.';

                switch (true) {
                    case errorMessage?.includes('Username'):
                        setFocusOn('username');
                        usernameRef.current?.focus();
                        break;
                    case errorMessage?.includes('Email'):
                        setFocusOn('email');
                        emailRef.current?.focus();
                        break;
                    case errorMessage?.includes('Password'):
                        setFocusOn('password');
                        passwordRef.current?.focus();
                        break;
                    default:
                        setFocusOn('name');
                        nameRef.current?.focus();
                        break;
                }

                toast.error(errorMessage);
            }
        },
        onSuccess: (data) => {
            const loginResult = signIn('credentials', {
                redirect: false,
                email,
                password
            });

            loginResult?.then((result) => {
                if (result?.error) {
                    toast.error('Failed to log in automatically.');
                } else {
                    router.push('/');
                }
            });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister();
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    // Helper function to determine if the input is invalid
    const isInputInvalid = (field) => focusOn === field;

    return (
        <div className="flex flex-1 items-center justify-center p-5 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                    Register
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        id="name"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dexter"
                        error={
                            isInputInvalid('name') ? 'Name is required' : null
                        }
                        ref={nameRef}
                    />
                    <Input
                        id="username"
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="dexter123"
                        error={
                            isInputInvalid('username')
                                ? 'Username is already taken'
                                : null
                        }
                        ref={usernameRef}
                    />
                    <Input
                        id="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="test@email.com"
                        error={
                            isInputInvalid('email')
                                ? 'Invalid email format'
                                : null
                        }
                        ref={emailRef}
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
                                    ? 'Password must be at least 6 characters'
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
                        disabled={isLoading}
                        className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a
                        href="/login"
                        className="text-blue-500 hover:text-blue-600"
                    >
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
