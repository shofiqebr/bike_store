import { Request, Response } from 'express';
import Product from './product.model';
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

export const productController = {
  createProduct,
};
