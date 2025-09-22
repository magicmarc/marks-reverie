export const theme = {
  colors: {
    // Primary literary color palette
    primary: {
      black: '#1a1a1a',
      white: '#fafafa',
      cream: '#f5f3f0',
      beige: '#e8e4dc',
      softBlue: '#a8c8d8',
      lightBlue: '#d4e4f0',
      paleBlue: '#f0f5f8',
    },
    
    // Text colors
    text: {
      primary: '#1a1a1a',
      secondary: '#4a4a4a',
      muted: '#8a8a8a',
      light: '#fafafa',
    },
    
    // Accent colors
    accent: {
      gold: '#d4af37',
      silver: '#c0c0c0',
      sage: '#9caf88',
    },
    
    // Background variations
    background: {
      main: '#fafafa',
      paper: '#ffffff',
      subtle: '#f5f3f0',
      elevated: '#ffffff',
    },
    
    // Borders and dividers
    border: {
      light: '#e8e4dc',
      medium: '#d0ccc4',
      dark: '#1a1a1a',
    }
  },
  
  typography: {
    fontFamily: {
      serif: '"Crimson Text", "Times New Roman", serif',
      sans: '"Inter", "Helvetica Neue", sans-serif',
      mono: '"JetBrains Mono", "Fira Code", monospace',
    },
    
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    }
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  }
}

export type Theme = typeof theme
