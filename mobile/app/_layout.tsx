import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import '@/global.css';
import { useAuth } from '@/store/authStore';
import { useCart } from '@/store/cartStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Link, Stack } from 'expo-router';
import { ShoppingCart, User } from 'lucide-react-native';
import { Pressable } from 'react-native';
const queryClient = new QueryClient();
export default function RootLayout() {
  const cartItemsNum = useCart((s) => s.items.length);
  const isLoggedIn = useAuth((s) => !!s.token);
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <Stack
          screenOptions={{
            headerRight: () =>
              cartItemsNum > 0 && (
                <Link href={'/cart'} asChild>
                  <Pressable className="flex-row gap-2">
                    <Icon as={ShoppingCart} />
                    <Text>{cartItemsNum}</Text>
                  </Pressable>
                </Link>
              )
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: 'Shop',
              headerLeft: () =>
                !isLoggedIn && (
                  <Link href={'/login'} asChild>
                    <Pressable className="flex-row gap-2">
                      <Icon as={User} />
                    </Pressable>
                  </Link>
                )
            }}
          />
          <Stack.Screen name="product/[id]" options={{ title: 'Product' }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
// import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
// import { Icon } from '@/components/ui/icon';
// import { Text } from '@/components/ui/text';
// import '@/global.css';
// import { useAuth } from '@/store/authStore';
// import { useCart } from '@/store/cartStore';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { Link, Stack } from 'expo-router';
// import { LogOut, ShoppingCart, User } from 'lucide-react-native';
// import { Pressable, View } from 'react-native';

// const queryClient = new QueryClient();

// export default function RootLayout() {
//   const cartItemsNum = useCart((s) => s.items.length);
//   const isLoggedIn = useAuth((s) => !!s.token);
//   const logout = useAuth((s) => s.logout);

//   return (
//     <QueryClientProvider client={queryClient}>
//       <GluestackUIProvider mode="light">
//         <Stack
//           screenOptions={{
//             headerLeft: () => (
//               <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
//                 <Link href={'/login'} asChild>
//                   <Pressable>
//                     <Icon as={User} />
//                   </Pressable>
//                 </Link>
//               </View>
//             ),
//             headerRight: () => (
//               <View style={{ flexDirection: 'row', paddingRight: 10 }}>
//                 {cartItemsNum > 0 && (
//                   <Link href={'/cart'} asChild>
//                     <Pressable
//                       style={{ flexDirection: 'row', alignItems: 'center' }}
//                     >
//                       <Icon as={ShoppingCart} />
//                       <Text>{cartItemsNum}</Text>
//                     </Pressable>
//                   </Link>
//                 )}
//                 {isLoggedIn && (
//                   <Pressable onPress={logout}>
//                     <Icon as={LogOut} />
//                   </Pressable>
//                 )}
//               </View>
//             )
//           }}
//         >
//           <Stack.Screen
//             name="index"
//             options={{
//               title: 'Shop',
//               headerLeft: () =>
//                 !isLoggedIn && (
//                   <Link href={'/login'} asChild>
//                     <Pressable className="flex-row gap-2">
//                       <Icon as={User} />
//                     </Pressable>
//                   </Link>
//                 )
//             }}
//           />
//           <Stack.Screen name="product/[id]" options={{ title: 'Product' }} />
//         </Stack>
//       </GluestackUIProvider>
//     </QueryClientProvider>
//   );
// }
