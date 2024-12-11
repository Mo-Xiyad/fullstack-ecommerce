import { Router } from 'express';
const router = Router();

router.route('/').get((req, res) => {
  res.send('products');
});

router
  .route('/:id')
  .get((req, res) => {
    res.send('id');
  })
  .put((req, res) => {
    res.send('update');
  });

export default router;
