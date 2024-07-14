import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['src/components/**/*.tsx', 'src/app/**/*.tsx'],
  theme: {
    extend: {
      backgroundImage: {
        'background-pattern': 'url("/background-pattern.png")',
      },
      boxShadow: {
        DEFAULT:
          '0px 8px 8px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.03), inset 0px 1px 0px rgba(255, 255, 255, 0.03)',
      },
    },
  },
  plugins: [],
}

export default config
