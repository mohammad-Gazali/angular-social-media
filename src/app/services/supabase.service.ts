import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';


interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private _session: AuthSession | null = null;
  public user: User & { name: string; image: string } | null = null;

  constructor() {
    this.supabase = createClient("https://pjhahpfveoyrxrpsskwd.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqaGFocGZ2ZW95cnhycHNza3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI0MTEyNTksImV4cCI6MjAxNzk4NzI1OX0.f9DOG2kS67jCrTaSw8z-4rXxK_8v_ajfoiyNxtVo11Q");
    this.supabase.auth.onAuthStateChange((_, session) => {
      if (session !== null) {
        this.user = {
          ...session.user,
          name: session.user.user_metadata["name"],
          image: `https://api.dicebear.com/7.x/identicon/svg?seed=${session.user.id}`
        };
      } else {
        this.user = null
      }
    })
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    })
    return this._session
  }

  signIn(credentials: Credentials) {
    return this.supabase.auth.signInWithPassword(credentials);
  }

  signUp(credentials: Credentials & { name: string }) {
    return this.supabase.auth.signUp({
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
    return this.supabase.auth.signOut()
  }
}
