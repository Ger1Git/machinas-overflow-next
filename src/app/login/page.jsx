'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Link from 'next/link';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { mutate: login } = useMutation({
        mutationFn: async (formData) => {
            try {
                setIsLoading(true);
                setErrorMessage('');

                const res = await axios.post('/api/auth/login', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await res.data;

                if (data.error) {
                    setErrorMessage(data.error);
                    setIsLoading(false);
                    return;
                }

                toast.success('Logged in successfully!');
                // You can add your redirect or state management logic here.
                setIsLoading(false);
            } catch (error) {
                toast.error('Failed to login');
                setIsLoading(false);
                setErrorMessage('An error occurred while logging in.');
            }
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-1 items-center justify-center py-5 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email / Username
                        </label>
                        <input
                            id="email"
                            type="text"
                            name="usernameOrEmail"
                            value={formData.usernameOrEmail}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your email"
                            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your password"
                            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {errorMessage && (
                        <div className="text-red-600 text-sm">
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?
                    <Link
                        href="/register"
                        className="text-blue-500 hover:text-blue-600 ml-1"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
