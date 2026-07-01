import { AppUser } from '../types';
import { SignupFormState } from '../components/AuthScreen';

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

type AuthResponse = {
  ok: boolean;
  token: string;
  user: AppUser;
  error?: string;
};

const authHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const buildApiUrl = (path: string) => {
  if (!apiBaseUrl) {
    throw new Error('VITE_API_BASE_URL is not configured.');
  }

  return `${apiBaseUrl}${path}`;
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  const raw = await response.text();
  let data: any = null;

  try {
    data = raw ? JSON.parse(raw) : null;
  } catch (_error) {
    throw new Error(
      `Auth API returned non-JSON from ${response.url}. Check that VITE_API_BASE_URL points to the backend service, not the frontend site.`
    );
  }

  if (!response.ok) {
    throw new Error(data.error || 'Request failed.');
  }
  return data as T;
};

export const signup = async (payload: SignupFormState): Promise<AuthResponse> => {
  const response = await fetch(buildApiUrl('/api/auth/signup'), {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<AuthResponse>(response);
};

export const login = async (payload: { email: string; password: string }): Promise<AuthResponse> => {
  const response = await fetch(buildApiUrl('/api/auth/login'), {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<AuthResponse>(response);
};

export const getCurrentUser = async (token: string): Promise<AppUser> => {
  const response = await fetch(buildApiUrl('/api/auth/me'), {
    headers: authHeaders(token),
  });
  const data = await handleResponse<{ ok: boolean; user: AppUser }>(response);
  return data.user;
};

export const getAdminUsers = async (token: string): Promise<AppUser[]> => {
  const response = await fetch(buildApiUrl('/api/admin/users'), {
    headers: authHeaders(token),
  });
  const data = await handleResponse<{ ok: boolean; users: AppUser[] }>(response);
  return data.users;
};
