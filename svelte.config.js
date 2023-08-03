import adapter from '@sveltejs/adapter-static';

// svelte.config.js
const preprocess = require('svelte-preprocess');

const config = {
    kit : {
        adapter: adapter({
            compress: true,
            // hydrate the <div id="svelte"> element in src/app.html
            brotliSize: 11,
        }),
    },
}


module.exports = {
    preprocess: preprocess(),
    // ...other svelte options could go here
};