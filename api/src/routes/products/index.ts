import { Router } from 'express';
import {
  createProductSchema,
  updateProductSchema
} from '../../db/schema/productSchema';
import { verifySeller, verifyToken } from '../../middlewares/authMiddleware';
import { validateBodyData } from '../../middlewares/validation';
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProductById
} from './handlers';
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
