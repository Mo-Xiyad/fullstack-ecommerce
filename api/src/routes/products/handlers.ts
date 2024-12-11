import { eq } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { productsTable } from '../../db/schema/productSchema';
export async function listProducts(req: Request, res: Response) {
  try {
    const product = await db.select().from(productsTable);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send('Server error!!');
  }
}
export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));

    if (!product) {
      res.status(404).send({ message: 'not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).send('Server error!!');
  }
}
export async function updateProductById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;

    const [product] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, id))
      .returning();

    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: 'Product was not found' });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
export async function createProduct(req: Request, res: Response) {
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).send('Server error!!');
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const [item] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();
    if (!item) {
      res.status(404).send({ message: 'product not found!' });
    }
    res.status(204).send('success!');
  } catch (error) {
    res.status(500).send('Server error!!');
  }
}
