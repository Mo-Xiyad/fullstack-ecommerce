import express, { json, Request, urlencoded } from 'express';
import ServerlessHttp from 'serverless-http';
import authRoutes from './routes/auth/index.js';
import ordersRoutes from './routes/orders/index.js';
import productsRoutes from './routes/products/index.js';
import stripeRoutes from './routes/stripe/index.js';

const app = express();
const port = process.env.PORT;

app.use(urlencoded({ extended: false }));
app.use(
  json({
    verify: (req: Request, res, buf) => {
      req.rawBody = buf;
    }
  })
);

app.get('/', (req, res) => {
  res.send('Test rout!');
});

app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/stripe', stripeRoutes);

// only because this is being executed as an edge function
if (process.env.NODE_ENV === 'dev') {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
export const handler = ServerlessHttp(app);
