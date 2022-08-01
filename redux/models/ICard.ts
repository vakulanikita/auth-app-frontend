import { TCategory } from "./TCategory";

export interface ICard {
  id: string,
  title: string,
  src: string,
  category: TCategory,
  isActive: boolean,
}