"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {getPosts} from "@/utils/supabaseRequests";

// Post tipini tanımlama
interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    writer: string;
    date: string;
    created_at: string;
    reading_time: number;
    image: string;
    slug: string;
}

// Context için tipler
interface PostContextType {
    posts: Post[];
    loading: boolean;
}

// Context'in varsayılan değerleri
const PostContext = createContext<PostContextType | undefined>(undefined);

// PostProvider bileşeni
interface PostProviderProps {
    children: ReactNode;
}

export const PostProvider = ({ children }: PostProviderProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const posts = await getPosts();

            if (!posts) {
                return;
            }

            setPosts(posts);
            setLoading(false);
        };

        fetchPosts();
    }, []);

    return (
        <PostContext.Provider value={{ posts, loading }}>
            {children}
        </PostContext.Provider>
    );
};

// Custom hook for easy context usage
export const usePosts = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePosts must be used within a PostProvider');
    }
    return context;
};
