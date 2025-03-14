import { RoleType, StatusType } from "../config/constants";

export interface UserData {
  id: number | null;
  login: string | null;
  role: string | null;
  status: string | null;
}

export interface User {
  id: string | null;
  login: string | null;
  role: RoleType | null;
  status: StatusType | null;
}
