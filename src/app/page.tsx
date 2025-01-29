import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }
    return <div>Hello</div>;
}
