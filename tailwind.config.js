module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/common/**/*.{js,ts,jsx,tsx}",
      "./src/modules/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontSize: {
          "2xs": ['9px', {
            letterSpacing: '-0.01em',
          }],
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }