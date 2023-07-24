import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true,
		}),
		// prerender: {
		// 	// use relative URLs similar to an anchor tag <a href="/test/1"></a>
		// 	// do not include group layout folders in the path such as /(group)/test/1
		// 	entries: [
		// 		'/players/1',  '/players/2',  '/players/3',  '/players/4',
		// 		'/players/5',  '/players/6',  '/players/7',  '/players/8',
		// 		'/players/9',  '/players/10', '/players/11', '/players/12',
		// 		'/players/13', '/players/14', '/players/15', '/players/16',
		// 		'/players/17', '/players/18', '/players/19', '/players/20',
		// 		'/players/21', '/players/22', '/players/23', '/players/24',
		// 		'/players/25', '/players/26', '/players/27', '/players/28',
		// 		'/players/29', '/players/30', '/players/31', '/players/32',
		// 		'/players/33', '/players/34', '/players/35', '/players/36',
		// 		'/players/37', '/players/38', '/players/39', '/players/40',
		// 		'/players/41', '/players/42', '/players/43', '/players/44',
		// 		'/players/45', '/players/46', '/players/47', '/players/48',
		// 		'/players/49', '/players/50', '/players/51', '/players/52',
		// 		'/players/53', '/players/54', '/players/55', '/players/56',
		// 		'/players/57', '/players/58', '/players/59', '/players/60',
		// 		'/players/61', '/players/62', '/players/63', '/players/64',
		// 		'/players/65', '/players/66', '/players/67', '/players/68',
		// 		'/players/69', '/players/70'
		// 	  ]
		// }
	},
};

export default config;
