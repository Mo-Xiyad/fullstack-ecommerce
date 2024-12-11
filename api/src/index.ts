import express, { json, urlencoded } from 'express';
import authRoutes from './routes/auth/index.js';
import ordersRoutes from './routes/orders/index.js';
import productsRoutes from './routes/products/index.js';

const app = express();
const port = process.env.PORT;

app.use(urlencoded({ extended: false }));
app.use(json());

app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

// only because this is being executed as an edge function
if (process.env.NODE_ENV === 'dev') {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
