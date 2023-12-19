import { Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';
import { Post } from '../../types';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  fetchedPosts = signal<Post[]>([]);
  fetched = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private supabase: SupabaseService, private auth: AuthService) {}

  async createPost(post: { text: string; imagesUrls: string[]; }) {
    try {
      if (this.auth.user() == null) return;
  
      const { error, status } = await this.supabase.client
       .from('post')
       .insert({
        ...post,
        author: this.auth.user()?.id,
        authorName: this.auth.user()?.name,
        authorEmail: this.auth.user()?.email,
      });

      if (error !== null) {
        return { error: error.message };
      }

      if (status >= 400) {
        
        return { error: "Something went wrong." }
      }

      return null

    } catch (e) {
      return { error: e };
    }
  }

  async fetchPosts() {
    this.loading.set(true);

    try {
      const { data } = await this.supabase.client
      .from('post')
      .select('*')
      .order('createdAt', { ascending: false });

      if (data === null) return;

      const newData = data.map((post) => ({
        ...post,
        imagesUrls: post.imagesUrls.map((url: any, index: number) => ({
          image: url,
          thumbImage: url,
          alt: `post ${post.id} image ${index}`,
        }))
      }))

      this.fetchedPosts.update(pre => [...newData, ...pre])
      
    } catch (error) {
      
      this.error.set(String(error));

    } finally {
      this.loading.set(false);
      this.fetched.set(true);
    }
  }

  async fetchLastPost() {
    try {
      const { data } = await this.supabase.client
      .from('post')
      .select('*')
      .eq('author', this.auth.user()?.id)
      .order('createdAt', { ascending: false })
      .limit(1);

      if (data === null) return;

      const newData = data.map((post) => ({
        ...post,
        imagesUrls: post.imagesUrls.map((url: any, index: number) => ({
          image: url,
          thumbImage: url,
          alt: `post ${post.id} image ${index}`,
        }))
      }))

      this.fetchedPosts.update(pre => [...newData, ...pre])
      
    } catch (error) {
      this.error.set(String(error));
    }
  }
}
