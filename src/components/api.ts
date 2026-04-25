export const BASE_URL = "https://katheleen-unerrant-consolingly.ngrok-free.dev";

export const API_ENDPOINTS = {
  // ─── Auth ─────────────────────────────────────────────────────────────────
  LOGIN: "/api/v1/editor/auth/login",
  FORGOT_PASSWORD: "/api/v1/editor/auth/forgot-password",
  RESET_PASSWORD: "/api/v1/editor/auth/reset-password",

  // ─── Editor Profile ───────────────────────────────────────────────────────
  EDITOR_GET_PROFILE: "/api/v1/editor/profile/get-profile",
  EDITOR_EDIT_PROFILE: "/api/v1/editor/profile/edit",
  EDITOR_CHANGE_PASSWORD: "/api/v1/editor/profile/change-password",

  // ─── Story – Editor ───────────────────────────────────────────────────────
  STORY_GET_ALL: "/api/v1/story/editor/all",
  STORY_REVIEW: (id: string) => `/api/v1/story/editor/review/${id}`,
  STORY_APPROVE: (id: string) => `/api/v1/story/editor/approve/${id}`,
  STORY_SCHEDULE: (id: string) => `/api/v1/story/editor/schedule/${id}`,
  STORY_REJECT: (id: string) => `/api/v1/story/editor/reject/${id}`,
  STORY_REQUEST_REVISION: (id: string) => `/api/v1/story/editor/request-revision/${id}`,
  STORY_EDIT: (id: string) => `/api/v1/story/editor/edit/${id}`,
} as const;

export const NOTIFICATION_ENDPOINTS = {
  GET_ALL:       "/api/v1/notification",
  MARK_READ:     (id: string) => `/api/v1/notification/${id}/read`,
  MARK_ALL_READ: "/api/v1/notification/read-all",
  DELETE:        (id: string) => `/api/v1/notification/${id}`,
} as const;