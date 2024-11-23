import Product from "./product.model";

const createProduct = async (payload) => {
    const result = await Product.create(payload);
  return result
}

export const productService = {
    createProduct,
}