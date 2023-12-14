import { Injectable } from '@angular/core';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';


@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  
  constructor() {
    this.supabase = createClient('https://pjhahpfveoyrxrpsskwd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqaGFocGZ2ZW95cnhycHNza3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI0MTEyNTksImV4cCI6MjAxNzk4NzI1OX0.f9DOG2kS67jCrTaSw8z-4rXxK_8v_ajfoiyNxtVo11Q');
  }

  get client() {
    return this.supabase
  }
}
