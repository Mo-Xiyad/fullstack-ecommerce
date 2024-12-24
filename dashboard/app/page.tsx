import { listProducts } from '@/api/products';
import ProductListItem from './dashboard/products/ProductListItem';

export default async function Home() {
  const products = await listProducts();

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="flex flex-wrap justify-center gap-4 max-w-[1400px]">
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
