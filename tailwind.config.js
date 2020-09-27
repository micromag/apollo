module.exports = {
    purge: [],
    theme: {
      screens: {
        'md': '850px',
        'sm': '850px',
      }, 
      boxShadow: {
        'dark-lg': '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)',
        'dark-xl': '0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)',
      },
      extend: {
        screens: {
          light: { raw: "(prefers-color-scheme: light)" },
          dark: { raw: "(prefers-color-scheme: dark)" }
        }
      }
    },
    variants: {},
    plugins: [
      function({ addBase, config }) {
        addBase({
          body: {
            color: config("theme.colors.black"),
            backgroundColor: config("theme.colors.white")
          },
          "@screen dark": {
            body: {
              color: config("theme.colors.white"),
              backgroundColor: config("theme.colors.black")
            }
          }
        });
      }
    ]
  }