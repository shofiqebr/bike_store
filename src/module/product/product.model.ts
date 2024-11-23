import { model, Schema } from "mongoose";


const productSchema = new Schema({
    name: { type: String, required: [true, 'Please provide your name'] },
    brand: { type: String, required: [true, 'Please provide brand name'] },
    price: { type: Number,  required: true, min: [0, "Price must be a positive number"] },
    category: { type: String, enum : {values:['Mountain', 'Road', 'Hybrid', 'Electric'], message: '{VALUE} is not available'}, required: true },
   description: { type: String },
   quantity: { type: Number, required: true },
   inStock: { type: Boolean, required: true }, 
},
{ timestamps: true } 

);

  const Product = model('Product', productSchema);

  export default Product