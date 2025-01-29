'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

const GithubButton = () => {
    return (
        <button onClick={() => signIn('github', { redirectTo: '/dashboard' })}>
            <Image src="/github.svg" alt="Github" width={40} height={40} />
        </button>
    );
};

export default GithubButton;
