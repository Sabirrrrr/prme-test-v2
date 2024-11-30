export interface UserProfile {
  email: string;
  user_type: 'individual' | 'corporate';
  status?: string;
  id?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
  errorMessage?: string;
}
