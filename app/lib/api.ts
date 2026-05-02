export type AuthUser = {
  id: string;
  username: string;
  email: string;
  roles: string[];
};

export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};

export type Employee = {
  id: string;
  employee_no: string;
  employment_type: string;
  joining_date: string;
  status: string;
  user?: {
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    username?: string;
    email?: string;
  } | null;
  department?: {
    name?: string;
    code?: string;
  } | null;
  designation?: {
    name?: string;
    category?: string;
  } | null;
};

export type PaginatedEmployees = {
  data: Employee[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://localhost:8000/api";

export const TOKEN_KEY = "ums_access_token";
export const USER_KEY = "ums_auth_user";

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof payload?.message === "string"
        ? payload.message
        : Array.isArray(payload?.message)
          ? payload.message.join(", ")
          : "Request failed";
    throw new Error(message);
  }

  return payload as T;
}

export async function login(username: string, password: string) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return parseResponse<LoginResponse>(response);
}

export async function getMe(token: string) {
  const response = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return parseResponse<AuthUser>(response);
}

export async function listEmployees({
  token,
  page,
  limit = 10,
  search,
}: {
  token: string;
  page: number;
  limit?: number;
  search?: string;
}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) {
    params.set("search", search);
  }

  const response = await fetch(`${API_BASE}/employees?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return parseResponse<PaginatedEmployees>(response);
}

export function storeSession(session: LoginResponse) {
  localStorage.setItem(TOKEN_KEY, session.accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
}

export function readToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function readStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function fullName(employee: Employee) {
  const parts = [
    employee.user?.first_name,
    employee.user?.middle_name,
    employee.user?.last_name,
  ].filter(Boolean);

  return parts.length > 0
    ? parts.join(" ")
    : employee.user?.username || "Unnamed employee";
}

export function initials(employee: Employee) {
  return fullName(employee)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
