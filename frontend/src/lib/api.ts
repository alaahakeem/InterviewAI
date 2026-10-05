const BASE_URL = '/api';

export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }
  return res.json();
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      apiRequest<{ token: string; user: { id: number; name: string; email: string; plan: string } }>(
        '/auth/login',
        { method: 'POST', body: JSON.stringify({ email, password }) }
      ),
    register: (name: string, email: string, password: string) =>
      apiRequest('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
  },
  dashboard: {
    get: () => apiRequest<any>('/dashboard'),
  },
  cv: {
    upload: (file: File) => {
      const token = localStorage.getItem('token');
      const form = new FormData();
      form.append('file', file);
      return fetch('/api/cv/upload', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: form,
      }).then(r => r.json());
    },
    getAnalysis: (id: number) => apiRequest<any>(`/cv/analysis/${id}`),
  },
  interview: {
    setup: (data: { role: string; type: string; difficulty: string; voiceMode: boolean }) =>
      apiRequest<any>('/interview/setup', { method: 'POST', body: JSON.stringify(data) }),
    complete: (id: number) => apiRequest<any>(`/interview/${id}/complete`, { method: 'POST' }),
    getResults: (id: number) => apiRequest<any>(`/interview/${id}/results`),
    getHistory: () => apiRequest<any[]>('/interview/history'),
  },
  learning: {
    getRoadmap: () => apiRequest<any>('/learning/roadmap'),
    getResources: () => apiRequest<any[]>('/learning/resources'),
  },
};
