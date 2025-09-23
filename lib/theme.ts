export const theme = {
  // Brand Colors - Modern, High-Tech, Precise
  colors: {
    primary: {
      DEFAULT: 'rgb(59, 130, 246)', // Blue-500
      dark: 'rgb(29, 78, 216)', // Blue-700
      light: 'rgb(147, 197, 253)', // Blue-300
      gradient: 'bg-gradient-to-r from-blue-600 to-cyan-600',
    },
    accent: {
      DEFAULT: 'rgb(6, 182, 212)', // Cyan-500
      dark: 'rgb(14, 116, 144)', // Cyan-700
      light: 'rgb(103, 232, 249)', // Cyan-300
      gradient: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    },
    neutral: {
      50: 'rgb(248, 250, 252)',
      100: 'rgb(241, 245, 249)',
      200: 'rgb(226, 232, 240)',
      300: 'rgb(203, 213, 225)',
      400: 'rgb(148, 163, 184)',
      500: 'rgb(100, 116, 139)',
      600: 'rgb(71, 85, 105)',
      700: 'rgb(51, 65, 85)',
      800: 'rgb(30, 41, 59)',
      900: 'rgb(15, 23, 42)',
      950: 'rgb(2, 6, 23)',
    }
  },

  // Typography Classes
  typography: {
    // Headings
    h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight',
    h2: 'text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight',
    h3: 'text-2xl sm:text-3xl md:text-4xl font-semibold',
    h4: 'text-xl sm:text-2xl md:text-3xl font-semibold',
    h5: 'text-lg sm:text-xl md:text-2xl font-medium',
    h6: 'text-base sm:text-lg md:text-xl font-medium',

    // Body
    lead: 'text-lg md:text-xl text-slate-600 leading-relaxed',
    body: 'text-base text-slate-600 leading-relaxed',
    small: 'text-sm text-slate-500',

    // Special
    badge: 'text-xs font-medium uppercase tracking-wider',
    label: 'text-sm font-medium text-slate-700',
  },

  // Component Styles
  components: {
    // Cards
    card: {
      base: 'bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300',
      dark: 'bg-slate-900/80 backdrop-blur-sm border border-slate-800/50 rounded-xl shadow-xl',
      glass: 'bg-white/10 backdrop-blur-md border border-white/20 rounded-xl',
    },

    // Buttons
    button: {
      primary: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300',
      secondary: 'bg-slate-800 hover:bg-slate-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300',
      outline: 'border-2 border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-600 font-medium transition-all duration-300',
      ghost: 'hover:bg-slate-100 text-slate-700 font-medium transition-all duration-300',
    },

    // Sections
    section: {
      light: 'bg-gradient-to-b from-slate-50 to-white',
      dark: 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950',
      pattern: 'relative overflow-hidden',
    },

    // Badges
    badge: {
      default: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700',
      primary: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700',
      success: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700',
      dark: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-800/50 text-slate-300 border border-slate-700/50 backdrop-blur-sm',
    }
  },

  // Animation Classes
  animation: {
    fadeIn: 'animate-in fade-in duration-500',
    slideUp: 'animate-in slide-in-from-bottom-4 duration-500',
    slideDown: 'animate-in slide-in-from-top-4 duration-500',
    scaleIn: 'animate-in zoom-in-90 duration-300',
    float: 'animate-float',
    pulse: 'animate-pulse',
  },

  // Spacing System
  spacing: {
    section: 'py-16 md:py-24 lg:py-32',
    container: 'container mx-auto px-4 sm:px-6 lg:px-8',
    stack: {
      sm: 'space-y-4',
      md: 'space-y-6',
      lg: 'space-y-8',
      xl: 'space-y-12',
    },
    grid: {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    }
  },

  // Effects
  effects: {
    glow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]',
    glowCyan: 'shadow-[0_0_30px_rgba(6,182,212,0.3)]',
    glassmorphism: 'bg-white/10 backdrop-blur-md border border-white/20',
    gradient: {
      text: 'text-transparent bg-clip-text bg-gradient-to-r',
      mesh: 'bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10',
    },
    grid: 'bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.02]',
  }
} as const;

// Utility function to combine classes
export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Style presets for common patterns
export const styles = {
  // Page Headers
  pageHeader: cn(
    'relative overflow-hidden',
    'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950',
    'pt-32 pb-16 md:pt-40 md:pb-24'
  ),

  pageTitle: cn(
    theme.typography.h1,
    'text-white mb-6'
  ),

  pageSubtitle: cn(
    theme.typography.lead,
    'text-slate-400 max-w-3xl mx-auto'
  ),

  // Feature Cards
  featureCard: cn(
    theme.components.card.base,
    'p-6 md:p-8 group'
  ),

  featureIcon: cn(
    'w-12 h-12 mb-4',
    'text-blue-600 group-hover:text-cyan-600',
    'transition-colors duration-300'
  ),

  // Stats
  statCard: cn(
    theme.components.card.dark,
    'p-6 text-center'
  ),

  statValue: cn(
    'text-3xl md:text-4xl font-bold',
    'text-transparent bg-clip-text',
    'bg-gradient-to-r from-blue-400 to-cyan-400'
  ),

  statLabel: cn(
    theme.typography.badge,
    'text-slate-400 mt-2'
  ),

  // CTAs
  ctaPrimary: cn(
    theme.components.button.primary,
    'px-8 py-4 text-base'
  ),

  ctaSecondary: cn(
    theme.components.button.outline,
    'px-8 py-4 text-base'
  ),

  // Sections
  sectionDark: cn(
    theme.components.section.dark,
    theme.spacing.section
  ),

  sectionLight: cn(
    theme.components.section.light,
    theme.spacing.section
  ),

  // Grid Layouts
  gridAuto: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8',
  grid2Col: 'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8',
  grid3Col: 'grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8',
  grid4Col: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8',
} as const;