import { Router } from 'express';
import { insertOrderWithItemsSchema } from '../../db/schema/orderSchema.js';
import { updateProductSchema } from '../../db/schema/productSchema.js';
import { verifyToken } from '../../middlewares/authMiddleware.js';
import { validateBodyData } from '../../middlewares/validation.js';
import {
  createOrder,
  getOrderById,
  listOrders,
  updateOrderById
} from './handlers.js';
const router = Router();

router
  .route('/')
  .get(verifyToken, listOrders)
  .post(verifyToken, validateBodyData(insertOrderWithItemsSchema), createOrder);

router
  .route('/:id')
  .get(getOrderById)
  .put(verifyToken, validateBodyData(updateProductSchema), updateOrderById);

export default router;
