'use client';

import Post from './Post';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const Posts = () => {
    const {
        data: posts,
        isLoading,
        refetch,
        isRefetching
    } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const { data } = await axios.get('/api/posts');
            return data.posts;
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.message || 'Failed to load posts.'
            );
        }
    });

    // useEffect(() => {
    //     refetch();
    // }, [feedType, refetch, username]);

    return (
        <>
            {isLoading || isRefetching ? (
                <div className="flex flex-col justify-center"></div>
            ) : !posts.length ? (
                <p className="text-center my-4">
                    No posts in this tab. Post something to see it here.
                </p>
            ) : (
                <>
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </>
            )}
        </>
    );
};

export default Posts;
