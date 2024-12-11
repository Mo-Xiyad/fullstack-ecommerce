import { Router } from 'express';
import {
  createProductSchema,
  updateProductSchema
} from '../../db/schema/productSchema';
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
  .post(validateBodyData(createProductSchema), createProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(validateBodyData(updateProductSchema), updateProductById)
  .delete(deleteProduct);

export default router;
