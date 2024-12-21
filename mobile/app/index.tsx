// import ProductListItem from '@/components/ProductListItem';
import {} from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from 'react-native';
import products from '../assets/products.json';

type Products = typeof products;
type Product = Products[number];

function ProductListItem({ product }: { product: Product }) {
  return <Text>{product.name}</Text>;
}
export default function HomeScreen() {
  return (
    <Button size="md" variant="solid" action="primary">
      <ButtonText>Hello World!</ButtonText>
    </Button>
    // <FlatList
    //   data={products}
    //   renderItem={({ item }) => <ProductListItem product={item} />}
    // />
  );
}
