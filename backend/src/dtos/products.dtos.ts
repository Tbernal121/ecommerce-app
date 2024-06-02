export class CreateProductDto {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly stock: number;
    readonly brand: string;
    readonly image: string; // an url of the image
    readonly category: string; 
    readonly tags?: string[];
    readonly discount?: number;
    readonly rating: number;
    readonly reviews: string[];
    readonly weight?: number;
    readonly height?: number;
    readonly width?: number;
    readonly depth?: number;
    readonly manufacturer?: string;
    readonly dateAdded: Date;
}

export class UpdateProductDto {
    readonly id?: number;
    readonly name?: string;
    readonly description?: string;
    readonly price?: number;
    readonly stock?: number;
    readonly brand?: string;
    readonly image?: string; // Optional image URL update
    readonly category?: string;
    readonly tags?: string[]; // Optional update to tags
    readonly discount?: number;
    readonly rating?: number; // Optional update to rating
    readonly reviews?: string[]; // Optional update to reviews
    readonly weight?: number;
    readonly height?: number;
    readonly width?: number;
    readonly depth?: number;
    readonly manufacturer?: string;
    readonly dateAdded?: Date; // Not updatable (assuming creation date is immutable)
  }


// products.dto.ts
export class CreateProductDTO {
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly image?: string; // the ? because it's an optional item
  }