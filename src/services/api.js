import { auth } from '../config/firebase';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Get the current Firebase ID token.
 */
const getToken = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  return await user.getIdToken(true);
};

/**
 * Authenticated fetch wrapper — attaches Firebase Bearer token.
 */
export const apiFetch = async (endpoint, options = {}) => {
  const token = await getToken();

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    const msg = data?.error?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data.data;
};

// ── Convenience methods ──────────────────────────────────────────────────────

export const apiGet = (endpoint) => apiFetch(endpoint, { method: 'GET' });

export const apiPost = (endpoint, body) =>
  apiFetch(endpoint, { method: 'POST', body: JSON.stringify(body) });

export const apiPut = (endpoint, body) =>
  apiFetch(endpoint, { method: 'PUT', body: JSON.stringify(body) });
