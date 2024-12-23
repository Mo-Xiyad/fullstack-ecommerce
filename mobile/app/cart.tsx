import { createOrder } from '@/api/orders';
import { createPaymentIntent } from '@/api/stripe';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useCart } from '@/store/cartStore';
import { useStripe } from '@stripe/stripe-react-native';
import { useMutation } from '@tanstack/react-query';
import { Redirect, useRouter } from 'expo-router';
import { Alert, FlatList } from 'react-native';

export default function CartScreen() {
  const items = useCart((state) => state.items);
  const resetCart = useCart((state) => state.resetCart);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const paymentIntentMutation = useMutation({
    mutationFn: createPaymentIntent,
    onSuccess: async (data) => {
      const { customer, ephemeralKey, paymentIntent } = data;

      const { error } = await initPaymentSheet({
        merchantDisplayName: 'Example, Inc.',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if it can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.

        defaultBillingDetails: {
          name: 'Jane Doe'
        }
        // returnURL: 'e-comers-app:/',
      });
      if (error) {
        Alert.alert('Error', error.message);
        console.log(error);
      }

      openPaymentSheet();
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const router = useRouter();

  const createOrderMutation = useMutation({
    mutationFn: () =>
      createOrder(
        items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price // MANAGED FORM SERVER SIDE
        }))
      ),
    onSuccess: (data) => {
      Alert.alert(`Order has been added!!`);
      paymentIntentMutation.mutate({ orderId: data.id });
    },
    onError: (error) => {
      Alert.alert(`Error code: ${error}`, error.message);
      console.log(error);
    }
  });

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      // TODO: handle error. The order is submitted, but payment failed.
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
      resetCart();
      // router.push(`/orders/${orderId}`);
      router.replace('/');
    }
  };

  const onCheckout = async () => {
    createOrderMutation.mutateAsync();

    // openPaymentSheet();
  };

  if (items.length === 0) {
    return <Redirect href={'/'} />;
  }

  return (
    <FlatList
      data={items}
      contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto p-2"
      renderItem={({ item }) => (
        <HStack className="bg-white p-3">
          <VStack space="sm">
            <Text bold>{item.product.name}</Text>
            <Text>$ {item.product.price}</Text>
          </VStack>
          <Text className="ml-auto">{item.quantity}</Text>
        </HStack>
      )}
      ListFooterComponent={() => (
        <Button onPress={onCheckout}>
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  );
}
