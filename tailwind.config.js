module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {

    extend: {
      scale: {
        '-100': '-1'
      }
    }
  },
  variants: {
    extend: {
      display: ['responsive', 'group-hover']
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ]
}
