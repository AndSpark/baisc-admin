import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vue3-oop/plugin-vue-jsx'
import { resolve } from 'path'
import UnoCSS from 'unocss/vite'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vueJsx(), UnoCSS(), svgLoader({ defaultImport: 'component' })],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	server: {
		proxy: {
			'/api': {
				target: 'https://nbzf.lujingkeji.com/api',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ''),
			},
		},
	},
})
