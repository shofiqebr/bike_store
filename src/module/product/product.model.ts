import { model, Schema } from "mongoose";
import { IProduct } from "./product.interface";


const productSchema = new Schema({
    name: { type: String, required: [true, 'Please provide your name'] },
    brand: { type: String, required: [true, 'Please provide brand name'] },
    price: { type: Number,  required: true, min: [0, "Price must be a positive number"] },
    model: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, enum : {values:['Mountain', 'Road', 'Hybrid', 'Electric'], message: '{VALUE} is not available'}, required: true },
   description: { type: String },
 
},
{ timestamps: true } 

);

  const Product = model<IProduct>('Product', productSchema);

  export default Product