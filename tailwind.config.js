/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['Bytesized', 'system-ui', 'sans-serif'],
        'mono': ['Jersey 10', 'ui-monospace', 'monospace'],
      },
      colors: {
        'phos': '#1cfe98',
        'phos-light': '#bfffe6',
        'phos-dark': '#0fae76',
        'bg-deep': '#081410',
      },
      height: {
        '19': '4.75rem', // 76px (0.7x of h-27 which is 108px)
        '27': '6.75rem', // 108px (0.75x of h-36 which is 144px)
        '34': '8.5rem', // 136px (0.75x of h-45 which is 180px)
        '45': '11.25rem', // 180px (1.5x of h-30 which is 120px)
      },
      animation: {
        'glow-pulse': 'glowPulse 2.8s ease-in-out infinite',
        'jitter': 'jitter 6s steps(2,end) infinite',
        'blink': 'blink 1s steps(2, start) infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { 
            filter: 'drop-shadow(0 0 8px rgba(28, 254, 152, 0.6)) drop-shadow(0 0 24px rgba(28, 254, 152, 0.35))' 
          },
          '50%': { 
            filter: 'drop-shadow(0 0 14px rgba(28, 254, 152, 0.9)) drop-shadow(0 0 40px rgba(28, 254, 152, 0.55))' 
          }
        },
        jitter: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '25%': { transform: 'translate(0.5px,-0.5px) scale(1.002)' },
          '50%': { transform: 'translate(-0.6px,0.4px) scale(0.998)' },
          '75%': { transform: 'translate(0.4px,0.6px) scale(1.001)' },
          '100%': { transform: 'translate(0,0) scale(1)' }
        },
        blink: {
          '50%': { opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}
