import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProductById
} from './handlers';
const router = Router();

router.route('/').get(listProducts).post(createProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProduct);

export default router;
