'use client';

import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Icon, MenuIcon, StarIcon, ThreeDotsIcon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();

  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];

  if (!token) {
    router.push('/login');
  }

  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <HStack className="h-full">
        <Sidebar />
        <Box className="flex-1 overflow-y-auto bg-gray-100 p-3">{children}</Box>
      </HStack>
      <MobileNavbar />
    </div>
  );
}

function Header() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/';
    router.push('/login');
  };

  return (
    <HStack className="p-3 border-b justify-between items-center flex flex-1">
      <Heading>Dashboard</Heading>
      <HStack className="items-center gap-3">
        <Avatar>
          <AvatarFallbackText>s</AvatarFallbackText>
        </Avatar>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </HStack>
    </HStack>
  );
}

function Sidebar() {
  return (
    <VStack className="p-3 pr-10 border-r gap-3 hidden md:flex">
      <Link href="/dashboard">
        <Text>Dashboard</Text>
      </Link>
      <Link href="/dashboard/products">
        <Text>Products</Text>
      </Link>
      <Link href="/dashboard/orders">
        <Text>Orders</Text>
      </Link>
    </VStack>
  );
}

function MobileNavbar() {
  return (
    <HStack className="p-3 pr-10 border-t gap-3 absolute bottom-0 left-0 right-0 bg-white justify-between md:hidden">
      <Link href="/dashboard">
        <Icon as={MenuIcon} />
      </Link>
      <Link href="/dashboard/products">
        <Icon as={StarIcon} />
      </Link>
      <Link href="/dashboard/orders">
        <Icon as={ThreeDotsIcon} />
      </Link>
    </HStack>
  );
}