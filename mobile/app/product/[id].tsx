import ProductListItem from '@/components/ProductListItem';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value';
import { VStack } from '@/components/ui/vstack';
import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList } from 'react-native';
import products from '../../assets/products.json';
export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log(products);
  const product = products.find((p) => p.id == Number(id));
  const addToCart = () => {};
  // if (!product) {
  //   // return <ActivityIndicator />;
  //   return <Text>Product not found!</Text>;
  // }
  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4
  });
  return (
    <FlatList
      key={numColumns}
      data={products.splice(0, 10)}
      numColumns={numColumns}
      contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
      columnWrapperClassName="gap-2"
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
  return (
    <Box className="flex-1 items-center p-3">
      <Stack.Screen options={{ title: product.name }} />

      <Card className="p-5 rounded-lg max-w-[960px] w-full flex-1">
        <Image
          source={{
            uri: product.image
          }}
          className="mb-6 h-[240px] w-full rounded-md"
          alt={`${product.name} image`}
          resizeMode="contain"
        />
        <Text className="text-sm font-normal mb-2 text-typography-700">
          {product.name}
        </Text>
        <VStack className="mb-6">
          <Heading size="md" className="mb-4">
            ${product.price}
          </Heading>
          <Text size="sm">{product.description}</Text>
        </VStack>
        <Box className="flex-col sm:flex-row">
          <Button
            onPress={addToCart}
            className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1"
          >
            <ButtonText size="sm">Add to cart</ButtonText>
          </Button>
          <Button
            variant="outline"
            className="px-4 py-2 border-outline-300 sm:flex-1"
          >
            <ButtonText size="sm" className="text-typography-600">
              Wishlist
            </ButtonText>
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
