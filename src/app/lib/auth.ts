import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },

            async authorize(credentials) {
                const { email, password } = credentials ?? {};

                if (!email || !password) {
                    return null;
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: { email }
                    });

                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (!passwordsMatch) {
                        return null;
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        username: user.username
                    };
                } catch (error) {
                    console.log('Error authorizing user: ', error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: 'jwt' as const
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    }
};
