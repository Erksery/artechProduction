export const API_ROUTES = {
    PROFILE: "/auth/profile",
    REGISTER: "/auth/register",
    AUTH: "/auth/login",
  } as const;
  
  export type ApiType = (typeof API_ROUTES)[keyof typeof API_ROUTES];