import { Product } from './product.entity';

export class Brand {
  id: number;
  name: string;
  image: string;
  website?: string;
  description?: string;
  rating?: number;
  products?: Product[]; // array of associated products (optional)
}
