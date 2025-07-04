import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#C54E71',
      purple: '#7962AD',
      pink: '#E68D9F',
      success: '#48bb78',
      successDark: '#38a169',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '100vh',
      },
    },
  },
  components: {
    Button: {
      variants: {
        gradient: {
          bg: 'linear-gradient(45deg, #667eea, #764ba2)',
          color: 'white',
          _hover: {
            bg: 'linear-gradient(45deg, #5a67d8, #6b46c1)',
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
          },
          borderRadius: 'full',
          px: 6,
        },
        gradientSecondary: {
          bg: 'linear-gradient(45deg, #C54E71, #7962AD)',
          color: 'white',
          _hover: {
            bg: 'linear-gradient(45deg, #A280CE, #51246E)',
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
          },
          borderRadius: 'full',
          px: 6,
        },
        gradientPink: {
          bg: 'linear-gradient(45deg, #E178B0, #CB5F9E)',
          color: 'white',
          _hover: {
            bg: 'linear-gradient(45deg, #E68D9F, #C54E71)',
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
          },
          borderRadius: 'full',
          px: 6,
        },
      },
    },
    Badge: {
      variants: {
        gradient: {
          bg: 'linear-gradient(45deg, #48bb78, #38a169)',
          color: 'white',
          borderRadius: 'full',
          fontWeight: 'bold',
        },
        gradientPrimary: {
          bg: 'linear-gradient(45deg, #667eea, #764ba2)',
          color: 'white',
          borderRadius: 'md',
          fontWeight: 'semibold',
        },
      },
    },
    Heading: {
      variants: {
        gradient: {
          bgGradient: 'linear(to-r, #667eea, #764ba2)',
          bgClip: 'text',
          fontWeight: 'bold',
        },
        gradientSecondary: {
          bgGradient: 'linear(to-r, #C54E71, #7962AD)',
          bgClip: 'text',
          fontWeight: 'bold',
        },
      },
    },
  },
})

export default theme
