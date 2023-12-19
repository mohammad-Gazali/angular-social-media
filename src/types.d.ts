import { type User as UserType } from '@supabase/supabase-js';


export type User = UserType & { name: string; image: string };

export interface Post {
    id: number;
    createdAt: string;
    author: string;
    authorName: string;
    authorEmail: string;
    text: string;
    imagesUrls?: {
        image: string;
        thumbImage: string;
        alt: string;
    }[];
    likes: number;
    comments: number;
}

export interface Like {
    id: number;
    user: string;
    post: number;
}

export interface Comment {
    id: number;
    createdAt: Date;
    user: string;
    post: number;
    text: string;
}

export interface Chat {
    id: number;
    user1: string;
    user2: string;
}

export interface Message {
    id: number;
    chat: number;
    sender: string;
    receiver: string;
    text: string;
    createdAt: Date;
}