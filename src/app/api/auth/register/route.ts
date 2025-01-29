import { NextResponse } from 'next/server';
import { prisma } from '../../utils/prismaClient';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    const body = await request.json();
    const { name, email, password, username } = body;

    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!emailRegex.test(email)) {
        return NextResponse.json(
            { error: 'Invalid email format' },
            { status: 400 }
        );
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { username }
        });

        if (existingUser) {
            return NextResponse.json(
                { message: 'Username is already taken' },
                { status: 400 }
            );
        }

        const existingEmail = await prisma.user.findUnique({
            where: { email }
        });

        if (existingEmail) {
            return NextResponse.json(
                { message: 'Email already used' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { message: 'Password must be at least 6 characters long' },
                { status: 400 }
            );
        }

        await prisma.user.create({
            data: {
                name,
                email,
                username,
                password: hashedPassword
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { message: 'Registration failed' },
            { status: 500 }
        );
    }
}
