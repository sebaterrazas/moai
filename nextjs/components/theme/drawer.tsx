import { drawerAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  dialog: {
    bg: `hsl(var(--background))`,
    borderTopRightRadius: 'md',
    borderBottomRightRadius: 'md',
  },
})

export const drawerTheme = defineMultiStyleConfig({
  baseStyle,
})