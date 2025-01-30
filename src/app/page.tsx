import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';
import CreatePost from './components/posts/CreatePost';
import Posts from './components/posts/Posts';

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    return (
        <div className="max-w-md space-y-5">
            <CreatePost />
            <Posts />
        </div>
    );
}
