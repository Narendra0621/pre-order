// Enhanced theme for DineAhead with Apple-style glassmorphism design

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5DD3D1', // Teal accent color
      light: '#8DE5E3',
      dark: '#3BA8A6',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#5D96D3', // Blue accent color  
      light: '#8DB4E3',
      dark: '#3B6BA8',
      contrastText: '#ffffff'
    },
    background: {
      default: '#0B1020', // Deep dark blue background
      paper: 'rgba(255, 255, 255, 0.04)' // Glassmorphism card background
    },
    text: {
      primary: '#E6EEF6', // Light blue-white text
      secondary: 'rgba(230, 238, 246, 0.7)',
      disabled: 'rgba(230, 238, 246, 0.5)'
    },
    grey: {
      50: '#F8FAFC',
      100: '#F1F5F9', 
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A'
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
      contrastText: '#ffffff'
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
      contrastText: '#ffffff'
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
      contrastText: '#ffffff'
    },
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
      contrastText: '#ffffff'
    },
    divider: 'rgba(255, 255, 255, 0.06)'
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em'
    },
    h2: {
      fontSize: '2.5rem', 
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em'
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.01em'
    }
  },
  shape: {
    borderRadius: 16
  },
  shadows: [
    'none',
    '0 1px 3px rgba(2, 6, 23, 0.1), 0 1px 2px rgba(2, 6, 23, 0.06)',
    '0 4px 6px rgba(2, 6, 23, 0.1), 0 2px 4px rgba(2, 6, 23, 0.06)',
    '0 10px 15px rgba(2, 6, 23, 0.1), 0 4px 6px rgba(2, 6, 23, 0.05)',
    '0 20px 25px rgba(2, 6, 23, 0.1), 0 10px 10px rgba(2, 6, 23, 0.04)',
    '0 25px 50px rgba(2, 6, 23, 0.25)',
    '0 6px 20px rgba(2, 6, 23, 0.6)', // Glassmorphism shadow
    '0 8px 25px rgba(2, 6, 23, 0.7)',
    '0 10px 30px rgba(2, 6, 23, 0.8)',
    '0 12px 35px rgba(2, 6, 23, 0.9)',
    '0 14px 40px rgba(2, 6, 23, 1.0)',
    '0 16px 45px rgba(2, 6, 23, 1.0)',
    '0 18px 50px rgba(2, 6, 23, 1.0)',
    '0 20px 55px rgba(2, 6, 23, 1.0)',
    '0 22px 60px rgba(2, 6, 23, 1.0)',
    '0 24px 65px rgba(2, 6, 23, 1.0)',
    '0 26px 70px rgba(2, 6, 23, 1.0)',
    '0 28px 75px rgba(2, 6, 23, 1.0)',
    '0 30px 80px rgba(2, 6, 23, 1.0)',
    '0 32px 85px rgba(2, 6, 23, 1.0)',
    '0 34px 90px rgba(2, 6, 23, 1.0)',
    '0 36px 95px rgba(2, 6, 23, 1.0)',
    '0 38px 100px rgba(2, 6, 23, 1.0)',
    '0 40px 105px rgba(2, 6, 23, 1.0)',
    '0 42px 110px rgba(2, 6, 23, 1.0)'
  ]
});

export default theme;