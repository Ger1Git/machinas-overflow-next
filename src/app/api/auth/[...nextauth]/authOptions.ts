import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProviders from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '../../utils/prismaClient';

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProviders({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                usernameOrEmail: { label: 'Email/Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },

            async authorize(credentials) {
                const { usernameOrEmail, password } = credentials ?? {};

                if (!usernameOrEmail || !password) {
                    return null;
                }

                try {
                    const user = await prisma.user.findFirst({
                        where: {
                            OR: [
                                { email: usernameOrEmail },
                                { username: usernameOrEmail }
                            ]
                        }
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
                        username: user.username,
                        email: user.email,
                        name: user.name
                    };
                } catch (error) {
                    console.log('Error authorizing user: ', error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.user = token.user;
            return session;
        }
    },
    session: {
        strategy: 'jwt' as const
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    }
};
