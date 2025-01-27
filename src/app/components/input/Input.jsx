import React, { forwardRef } from 'react';

const Input = forwardRef(
    (
        { id, label, value, onChange, placeholder, error, type = 'text' },
        ref
    ) => {
        const isInvalid = error ? 'border-red-500' : '';

        return (
            <div>
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
                    required
                    ref={ref}
                    className={`mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isInvalid}`}
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
