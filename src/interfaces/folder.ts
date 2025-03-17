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
  privacy: "Public" | "Private";
  sharingOptions: string;
}
