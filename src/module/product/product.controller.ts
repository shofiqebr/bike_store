import { IProduct } from './product.interface';
import { Request, Response } from 'express';
// import Product from './product.model';
import { productService } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await productService.createProduct(payload);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (error: any) {
    // Check if it's a validation error
    if (error.name === 'ValidationError') {
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: {
          name: error.name,
          errors: error.errors,
        },
      });
    } else {
      // Handle other unexpected errors
      res.status(500).json({
        message: 'An unexpected error occurred',
        success: false,
        error: error.message,
      });
    }
  }
};

const getProduct = async (req: Request, res: Response) => {
    try{
        const result = await productService.getProduct()

        res.send({
            status: true,
            message : "Product getting successfully",
            result
        })
    }catch(error){
        res.json({
            status: false,
            message: "somthing went wrong",
            error,
        })
    }
}


const getSingleProduct = async (req: Request, res: Response) => {
    try{

        const productId = req.params.productId
        const result = await productService.getSingleProduct(productId)

        res.send({
            status: true,
            message : "Product getting successfully",
            result
        })
    }catch(error){
        res.json({
            status: false,
            message: "somthing went wrong",
            error,
        })
    }
}
const updateProduct = async (req: Request, res: Response) => {
    try{

        const productId = req.params.productId
        const body = req.body
        const result = await productService.updateProduct(productId,body)

        res.send({
            status: true,
            message : "Product updated successfully",
            result
        })
    }catch(error){
        res.json({
            status: false,
            message: "somthing went wrong",
            error,
        })
    }
}
const deletProduct = async (req: Request, res: Response) => {
    try{

        const productId = req.params.productId
     await productService.deletProduct(productId)

        res.send({
            status: true,
            message : "Product deleted successfully",
            result: {},
        })
    }catch(error){
        res.json({
            status: false,
            message: "somthing went wrong",
            error,
        })
    }
}

export const productController = {
  createProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
  deletProduct
};
