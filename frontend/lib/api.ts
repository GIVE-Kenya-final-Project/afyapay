const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("afyapay_token");
}

export function getUser(): { wallet: string; role: string; name: string } | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("afyapay_user");
  return raw ? JSON.parse(raw) : null;
}

export function setAuth(token: string, user: { wallet: string; role: string; name: string }) {
  localStorage.setItem("afyapay_token", token);
  localStorage.setItem("afyapay_user", JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem("afyapay_token");
  localStorage.removeItem("afyapay_user");
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Request failed");
  return data;
}

export const api = {
  get: (path: string) => request(path),
  post: (path: string, body?: unknown) => request(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
};
