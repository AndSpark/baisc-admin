/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}

interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string
	readonly VITE_AMAP_KEY: string
	// 更多环境变量...
}
