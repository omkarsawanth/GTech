import { auth } from '../config/firebase.js';

const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || (typeof window !== 'undefined' && window.location?.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api');

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
