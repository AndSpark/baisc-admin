import { getCurrentApp, Hook, VueService } from 'vue3-oop'
import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router'
import { resolveInstances } from '@/app/utils/injection'
import { Injectable } from 'injection-js'
import { routes } from './routes'

@Injectable()
export class RouterService extends VueService {
	history = createWebHistory()
	router!: Router
	get currentRoute() {
		return this.router.currentRoute.value
	}
	app = getCurrentApp()!
	// 为了解决热更新循环引用,采用函数传参初始化
	initRoutes() {
		const resolvedRoutes = resolveInstances(routes as any[])

		resolvedRoutes.forEach(v => v.initRoute())

		this.router = createRouter({
			history: this.history,
			routes: [
				{
					path: '/',
					children: resolvedRoutes,
					component: () => import('@/app/components/layout/index'),
				},
			],
		})

		this.app.use(this.router)
	}

	@Hook('BeforeUnmount')
	unmount() {
		this.history.destroy()
	}
}
