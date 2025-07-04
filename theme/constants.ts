/**
 * Theme constants for consistent styling across the app
 * Simple approach for the tech test - easy to understand and maintain
 */

export const colors = {
  primary: '#667eea',
  secondary: '#764ba2',
  accent: '#C54E71',
  purple: '#7962AD',
  pink: '#E68D9F',
  success: '#48bb78',
  successDark: '#38a169',
} as const

export const gradients = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  secondary: 'linear-gradient(45deg, #C54E71, #7962AD)',
  accent: 'linear-gradient(45deg, #667eea, #764ba2)',
  success: 'linear-gradient(45deg, #48bb78, #38a169)',
  overlay: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
  cardHover: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
  pink: 'linear-gradient(45deg, #E178B0, #CB5F9E)',
} as const
