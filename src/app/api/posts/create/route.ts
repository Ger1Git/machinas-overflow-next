import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { prisma } from '../../utils/prismaClient';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { body, category } = await req.json();

        if (!body || body.trim().length === 0) {
            return new Response(JSON.stringify({ error: 'Body is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const newPost = await prisma.post.create({
            data: {
                body,
                userId: session.user.id,
                category: category || 'Uncategorized'
            }
        });

        return new Response(JSON.stringify(newPost), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: `Failed to create post: ${error?.message}`
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
