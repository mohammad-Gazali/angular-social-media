import { Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { User } from '@supabase/supabase-js';

interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user = signal<User & { name: string; image: string } | null>(null);

  constructor(private supabase: SupabaseService) {
    this.supabase.client.auth.onAuthStateChange((_, session) => {
      if (session !== null) {
        this.user.set({
          ...session.user,
          name: session.user.user_metadata['name'],
          image: `https://api.dicebear.com/7.x/identicon/svg?seed=${session.user.id}`
        });
      } else {
        this.user.set(null)
      }
    })
  }

  signIn(credentials: Credentials) {
    return this.supabase.client.auth.signInWithPassword(credentials);
  }

  signUp(credentials: Credentials & { name: string }) {
    return this.supabase.client.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          name: credentials.name,
        }
      }
    })
  }

  signOut() {
    return this.supabase.client.auth.signOut()
  }
}
