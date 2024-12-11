import { Router } from 'express';
import { createProductSchema } from '../../db/schema/productSchema';
import { validateData } from '../../middlewares/validation';
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
  .post(validateData(createProductSchema), createProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProduct);

export default router;
