import { Router } from 'express';
import {
  createProductSchema,
  updateProductSchema
} from '../../db/schema/productSchema.js';
import { verifySeller, verifyToken } from '../../middlewares/authMiddleware.js';
import { validateBodyData } from '../../middlewares/validation.js';
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProductById
} from './handlers.js';
const router = Router();

router
  .route('/')
  .get(listProducts)
  .post(
    verifyToken,
    verifySeller,
    validateBodyData(createProductSchema),
    createProduct
  );

router
  .route('/:id')
  .get(getProductById)
  .put(
    verifyToken,
    verifySeller,
    validateBodyData(updateProductSchema),
    updateProductById
  )
  .delete(verifyToken, verifySeller, deleteProduct);

export default router;
