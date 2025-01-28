'use client';

import React, { forwardRef } from 'react';

interface InputProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string | null;
    type?: string;
    required?: boolean;
    className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            id,
            label,
            value,
            onChange,
            placeholder = '',
            error = null,
            type = 'text',
            required = false,
            className = ''
        },
        ref
    ) => {
        const isInvalid = error
            ? 'border-red-500 focus:ring-red-500'
            : 'focus:ring-blue-500';

        return (
            <div className={`input-wrapper ${className}`}>
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
                <input
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    ref={ref}
                    className={`mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${isInvalid}`}
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
