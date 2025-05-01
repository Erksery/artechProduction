import { PrivacyType, SharingType } from "../config/constants";

export interface Creator {
  id: number;
  login: string;
  role: string;
  status: string;
}

export interface FolderData {
  id: string;
  name: string;
  description: string | null;
  inFolder: string | null;
  creator: string;
  privacy: PrivacyType;
  sharingOptions: SharingType;
}
