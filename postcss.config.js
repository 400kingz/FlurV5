module.exports = {
  plugins: [
    require('postcss-purgecss')({
      content: ['./public/**/*.html', './src/**/*.svelte'],
      whitelistPatterns: [/svelte-/, /fa-icon/],
      defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    }),
  ],
};