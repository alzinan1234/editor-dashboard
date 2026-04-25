// apiClient.ts
// Token management + all request functionality

import { BASE_URL, API_ENDPOINTS } from "./api";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthResponse {
  success: boolean;
  message?: string;
  access_token?: string;
  refresh_token?: string;
  data?: User;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  profileImage?: string;
  role?: string;
  phone?: string | null;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// ─── Token Service ────────────────────────────────────────────────────────────

export const TokenService = {
  getAccessToken: (): string | null => localStorage.getItem("access_token"),
  getRefreshToken: (): string | null => localStorage.getItem("refresh_token"),

  setTokens: (accessToken: string, refreshToken: string): void => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
  },

  clearTokens: (): void => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  },

  setUser: (user: User): void => {
    localStorage.setItem("user", JSON.stringify(user));
  },

  getUser: (): User | null => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        return JSON.parse(user) as User;
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        return null;
      }
    }
    return null;
  },

  updateUser: (updates: Partial<User>): void => {
    const currentUser = TokenService.getUser();
    if (currentUser) {
      TokenService.setUser({ ...currentUser, ...updates });
      // Dispatch event to notify components about user update
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("userUpdated", { detail: updates }));
        window.dispatchEvent(new CustomEvent("profileUpdated"));
      }
    }
  },

  isLoggedIn: (): boolean => {
    const token = localStorage.getItem("access_token");
    return !!token;
  },

  getUserRole: (): string | null => {
    const user = TokenService.getUser();
    return user?.role || null;
  },
};

// ─── Core Request ─────────────────────────────────────────────────────────────

async function request<T = unknown>(
  url: string,
  method: HttpMethod = "GET",
  body: object | null = null,
  auth: boolean = false,
  extraHeaders: Record<string, string> = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
    ...extraHeaders,
  };

  if (auth) {
    const token = TokenService.getAccessToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = { method, headers };
  if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        (data as { message?: string })?.message ||
          `Request failed with status ${response.status}`
      );
    }

    return data as T;
  } catch (error) {
    console.error(`Request failed: ${method} ${url}`, error);
    throw error;
  }
}

// ─── HTTP Method Shortcuts ────────────────────────────────────────────────────

export const apiClient = {
  get: <T = unknown>(endpoint: string, auth = false): Promise<T> =>
    request<T>(BASE_URL + endpoint, "GET", null, auth),

  post: <T = unknown>(endpoint: string, body: object, auth = false): Promise<T> =>
    request<T>(BASE_URL + endpoint, "POST", body, auth),

  put: <T = unknown>(endpoint: string, body: object, auth = false): Promise<T> =>
    request<T>(BASE_URL + endpoint, "PUT", body, auth),

  patch: <T = unknown>(endpoint: string, body: object, auth = false): Promise<T> =>
    request<T>(BASE_URL + endpoint, "PATCH", body, auth),

  delete: <T = unknown>(endpoint: string, auth = false): Promise<T> =>
    request<T>(BASE_URL + endpoint, "DELETE", null, auth),
};

// ─── Form Data Request (for file uploads) ─────────────────────────────────────

export async function formDataRequest<T = unknown>(
  url: string,
  method: HttpMethod = "POST",
  formData: FormData,
  auth: boolean = true
): Promise<T> {
  const headers: Record<string, string> = {
    "ngrok-skip-browser-warning": "true",
  };

  if (auth) {
    const token = TokenService.getAccessToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = { method, headers, body: formData };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        (data as { message?: string })?.message ||
          `Request failed with status ${response.status}`
      );
    }

    return data as T;
  } catch (error) {
    console.error(`Form data request failed: ${method} ${url}`, error);
    throw error;
  }
}

// ─── Auth Functions ───────────────────────────────────────────────────────────

/**
 * Login editor – stores tokens & user on success
 */
export async function loginEditor(
  email: string,
  password: string
): Promise<AuthResponse> {
  const data = await apiClient.post<AuthResponse>(API_ENDPOINTS.LOGIN, {
    email,
    password,
  });

  if (data.success && data.access_token && data.refresh_token) {
    TokenService.setTokens(data.access_token, data.refresh_token);
    if (data.data) {
      // Ensure user has role and profile image
      const userWithRole = { 
        ...data.data, 
        role: "editor",
        profileImage: data.data.profileImage || undefined
      };
      TokenService.setUser(userWithRole);
    }
  }

  return data;
}

/**
 * Send OTP to email for password reset
 */
export async function forgotPassword(email: string): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>(API_ENDPOINTS.FORGOT_PASSWORD, { email });
}

/**
 * Reset password using OTP
 */
export async function resetPassword(
  email: string,
  otp: string,
  newPassword: string
): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>(API_ENDPOINTS.RESET_PASSWORD, {
    email,
    otp,
    newPassword,
  });
}

/**
 * Logout – clears all stored tokens and user data
 */
export function logoutEditor(): void {
  TokenService.clearTokens();
  // Dispatch logout event
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("userLoggedOut"));
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return TokenService.isLoggedIn();
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  return TokenService.getUser();
}

export default apiClient;