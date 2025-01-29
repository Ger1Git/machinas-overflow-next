'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

const GithubButton = () => {
    return (
        <button onClick={() => signIn('google', { redirectTo: '/dashboard' })}>
            <Image src="/google.svg" alt="Google" width={40} height={40} />
        </button>
    );
};

export default GithubButton;
