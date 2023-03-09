import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vue3-oop/plugin-vue-jsx'
import { resolve } from 'path'
import UnoCSS from 'unocss/vite'
import svgLoader from 'vite-svg-loader'
import ssl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [ssl(), vue(), vueJsx(), UnoCSS(), svgLoader({ defaultImport: 'component' })],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	server: {
		https: true,
		host: true,
		proxy: {
			'/api': {
				target: 'https://nbzf.lujingkeji.com/api',
				changeOrigin: true,
				secure: false,
				ws: true,
				rewrite: path => path.replace(/^\/api/, ''),
			},
		},
	},
})
