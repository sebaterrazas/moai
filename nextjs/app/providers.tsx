'use client'
import { ChakraProvider, useColorMode } from '@chakra-ui/react';

import { extendTheme } from '@chakra-ui/react'
import { drawerTheme } from '@/components/theme/drawer'
import { menuTheme } from '@/components/theme/menu'

export const theme = extendTheme({
  components: { Drawer: drawerTheme, Modal: drawerTheme, Menu: menuTheme },
})

export function Providers({ children }: { children: React.ReactNode }) {


  return (
    <ChakraProvider theme={extendTheme(theme)}>
      {children}
    </ChakraProvider>
  );
}
