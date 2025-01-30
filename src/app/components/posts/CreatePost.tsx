'use client';

import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { CiImageOn } from 'react-icons/ci';
import { IoCloseSharp } from 'react-icons/io5';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [category, setCategory] = useState('');
    const imageInputRef = useRef(null);

    const queryClient = useQueryClient();

    const {
        mutate: createPost,
        isPending,
        isError,
        error
    } = useMutation({
        mutationFn: async (newPost: { body: string; category: string }) => {
            const { data } = await axios.post('/api/posts/create', newPost);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            setContent('');
            setCategory('');
            toast.success('Post created successfully!');
        },
        onError: (error) => {
            toast.error(error.message || 'Something went wrong.');
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) {
            toast.error('Write something in order to post');
            return;
        }

        if (!category) {
            toast.error('Please select a category.');
            return;
        }

        createPost({ body: content, category });
    };

    const handleImageUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            previewImage(selectedFile);
        }
    };

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const clearImagePreview = () => {
        setImagePreview(null);
        imageInputRef.current.value = null;
    };

    return (
        <div className="p-6 border rounded-lg shadow lg:min-w-[400px]">
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Write your post..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    className="w-full p-2 border rounded"
                />
                {imagePreview && (
                    <div className="relative w-72 mx-auto">
                        <IoCloseSharp
                            className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
                            onClick={clearImagePreview}
                        />
                        <Image
                            src={imagePreview}
                            className="w-full mx-auto h-72 object-contain rounded"
                            alt="Preview"
                        />
                    </div>
                )}
                <div className="flex justify-between py-2">
                    <div className="flex gap-1 items-center">
                        <CiImageOn
                            className="fill-primary w-6 h-6 cursor-pointer"
                            onClick={() => imageInputRef.current.click()}
                        />
                    </div>
                    <input
                        type="file"
                        hidden
                        ref={imageInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                    />
                    <input
                        type="text"
                        placeholder="Enter category..."
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <button className="btn btn-primary bg-blue-400 rounded-full btn-sm text-white px-4">
                        {isPending ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
