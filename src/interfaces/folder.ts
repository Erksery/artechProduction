export interface Creator {
  id: number;
  login: string;
  role: string;
  status: string;
}

export interface FolderData {
  id: number;
  name: string;
  inFolder: number;
  creator: Creator;
  privacy: "Public" | "Private";
  createdAt: string;
  updatedAt: string;
}
