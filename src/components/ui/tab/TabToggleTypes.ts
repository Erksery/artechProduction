import { SharingType } from "../../../config/constants";

export interface TabToggleTypes {
  id: number;
  title: string;
  name: SharingType;
  event: () => void;
}
