import { Product } from './product.entity';

export class Category {
  id: number;
  name: string;
  description?: string;
  image?: string; // an url of the image
  parentCategory?: Category; // reference to a parent category (optional)
  subCategories?: Category[]; // array of subcategories (optional)
  products?: Product[]; // array of associated products (optional)
}
