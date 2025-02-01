type Category = 'Mountain' | 'Road' | 'Hybrid' | 'Electric';

export interface IProduct {
    name: string;
    brand: string;
    price: number;
    category: Category;
    description : string;
    quantity : number;
    inStock  : boolean;
    // createdAt?: Date; 
    // updatedAt?: Date;
  }