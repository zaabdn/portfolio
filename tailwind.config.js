/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        neo: {
          mint: '#B2F5EA',
          pink: '#FF6B9D',
          green: '#6BCB77',
          blue: '#4D96FF',
          orange: '#FF9F1C',
          red: '#FF3B3B',
          purple: '#9B59FF',
          teal: '#00BCD4',
          yellow: '#FFE135',
          bg: '#FFFBEF',
        },
      },
      boxShadow: {
        neo: '4px 4px 0px 0px #000000',
        'neo-lg': '6px 6px 0px 0px #000000',
        'neo-sm': '2px 2px 0px 0px #000000',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(3deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-2deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg) scale(1)' },
          '50%': { transform: 'rotate(4deg) scale(1.05)' },
        },
        spin_slow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        bounce_slow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        wiggle: 'wiggle 2.5s ease-in-out infinite',
        spin_slow: 'spin_slow 8s linear infinite',
        bounce_slow: 'bounce_slow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
