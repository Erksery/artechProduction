export interface SortType {
  id: number;
  title: string;
  menuTitle: string;
  sortName: string;
}

export const sortMethods: SortType[] = [
  {
    id: 1,
    title: "Названию",
    menuTitle: "по названию",
    sortName: "originalFilename",
  },
  { id: 2, title: "Типу", menuTitle: "по типу", sortName: "mimeType" },
  { id: 3, title: "Размеру", menuTitle: "по размеру", sortName: "size" },
  {
    id: 4,
    title: "Дате создания",
    menuTitle: "по дате создания",
    sortName: "createdAt",
  },
  {
    id: 5,
    title: "Дате редактирования",
    menuTitle: "по дате редактирования",
    sortName: "updatedAt",
  },
];
