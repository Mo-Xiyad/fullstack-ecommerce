import express, { json, urlencoded } from 'express';
import authRoutes from './routes/auth/index';
import productsRoutes from './routes/products/index';

const app = express();
const port = process.env.PORT;

app.use(urlencoded({ extended: false }));
app.use(json());

app.use('/products', productsRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Port running on port ${port}`);
});
