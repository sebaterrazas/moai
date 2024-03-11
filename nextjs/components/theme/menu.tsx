import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

// define the base component styles
const baseStyle = definePartsStyle({
  list: {
    border: 'none',
    bg: `hsl(var(--background))`,
  },
  item: {
    bg: `hsl(var(--background))`,
    _hover: {
        bg: `hsl(var(--highlight))`,
      },
      _focus: {
        bg: `hsl(var(--highlight))`,
      },
  },
  groupTitle: {
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 'wider',
    opacity: '0.7',
  },
  divider: {
    opacity: '0.5',
},
})
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle })