import { Request, Response } from 'express';
export function listProducts(req: Request, res: Response) {
  res.send('list products');
}
export function getProductById(req: Request, res: Response) {
  res.send('products by id');
}
export function updateProductById(req: Request, res: Response) {
  res.send('update products by id');
}
export function createProduct(req: Request, res: Response) {
  console.log(req.body);
  res.send('create products');
}
export function deleteProduct(req: Request, res: Response) {
  res.send('delete products');
}
