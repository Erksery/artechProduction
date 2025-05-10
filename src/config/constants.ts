export const PRIVACY_VALUES = {
  PRIVATE: "Private",
  PUBLIC: "Public",
  LINK: "Link",
} as const;

export const STATUS_VALUES = {
  APPROVED: "approved",
  PENDING: "pending",
} as const;

export const ROLE_VALUES = {
  USER: "User",
  ADMIN: "Admin",
} as const;

export const SHARING_VALUES = {
  READING: "Reading",
  EDITING: "Editing",
} as const;

export const VIEW_MODES = {
  GRID: "grid",
  LIST: "list",
};

export type PrivacyType = (typeof PRIVACY_VALUES)[keyof typeof PRIVACY_VALUES];
export type StatusType = (typeof STATUS_VALUES)[keyof typeof STATUS_VALUES];
export type RoleType = (typeof ROLE_VALUES)[keyof typeof ROLE_VALUES];
export type SharingType = (typeof SHARING_VALUES)[keyof typeof SHARING_VALUES];
export type ViewType = (typeof VIEW_MODES)[keyof typeof VIEW_MODES];
