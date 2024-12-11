import express from 'express';
import productsRouter from './routes/products/index';
const app = express();
const port = process.env.PORT;

app.use('/products', productsRouter);

app.listen(port, () => {
  console.log(`Port running on port ${port}`);
});
