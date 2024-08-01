export interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  image: string;
  category: string;
  tags?: string[];
  discount?: number;
  rating?: number;
  reviews?: string[];
  weight?: number;
  height?: number;
  width?: number;
  depth?: number;
  manufacturer?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
