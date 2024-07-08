export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  image: string; // an url of the image
  category: string;
  tags?: string[];
  discount?: number;
  rating: number;
  reviews: string[];
  weight?: number;
  height?: number;
  width?: number;
  depth?: number;
  manufacturer?: string;
  dateAdded: Date;
}
