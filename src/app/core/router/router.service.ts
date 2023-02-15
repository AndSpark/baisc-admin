import { getCurrentApp, Hook, VueService } from 'vue3-oop'
import { createRouter, createWebHistory, Router } from 'vue-router'
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
		this.router = createRouter({
			history: this.history,
			routes: resolveInstances(routes as any[]),
		})

		this.app.use(this.router)
	}

	@Hook('BeforeUnmount')
	unmount() {
		this.history.destroy()
	}
}
