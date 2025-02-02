type Category = 'Mountain' | 'Road' | 'Hybrid' | 'Electric';

export interface IProduct {
    name: string;
    brand: string;
    price: number;
    model: string;
    category: Category;
    description : string;
    stock: number;
    // createdAt?: Date; 
    // updatedAt?: Date;
  }