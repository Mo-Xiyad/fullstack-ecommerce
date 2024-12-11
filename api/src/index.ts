import express, { json, urlencoded } from 'express';
import productsRouter from './routes/products/index';

const app = express();
const port = process.env.PORT;

app.use(urlencoded({ extended: false }));
app.use(json());

app.use('/products', productsRouter);

app.listen(port, () => {
  console.log(`Port running on port ${port}`);
});
