import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://pcshyzlkjmvournzhegx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Gi5OJVCbQIdy3RU1xi0j6g_So4611Sy';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  async login(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password });
  }

  async signup(
    email: string = 'abc123xyz789@gmail.com',
    password: string = 'Password123!',
  ) {
    console.log(JSON.stringify(email));
    console.log(email.length);
    return await supabase.auth.signUp({ email, password });
  }

  async getSession() {
    return await supabase.auth.getSession();
  }

  async logout() {
    await supabase.auth.signOut();
    localStorage.removeItem('token');
  }

  async storeToken() {
    const { data } = await this.getSession();
    const token = data.session?.access_token;
    if (token) {
      localStorage.setItem('token', token);
    }
  }
}
