import { Computed, getCurrentApp, Hook, Mut, VueService } from 'vue3-oop'
import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router'
import { Injectable } from 'injection-js'
import { createRoutes } from './routes'
import { RouteMenu, transformRoutesToMenu } from './menu'
import { nextTick } from 'vue'
@Injectable()
export class RouterService extends VueService {
	history = createWebHistory()
	router!: Router
	get currentRoute() {
		return this.router.currentRoute.value
	}

	@Mut() excludes: string[] = []
	@Mut() reloadFlag = true
	@Mut() menu: RouteMenu[] = []

	app = getCurrentApp()!
	// 为了解决热更新循环引用,采用函数传参初始化
	initRoutes() {
		const routes = createRoutes()
		this.router = createRouter({
			history: this.history,
			routes: [
				{
					path: '/',
					children: routes,
					component: () => import('@/app/components/layout/index'),
				},
			],
		})
		this.app.use(this.router)
		this.menu = transformRoutesToMenu(routes)
	}

	async reload() {
		const name = this.currentRoute.name!.toString().replace('Route', 'Page')
		this.excludes.push(name)
		this.reloadFlag = false
		await nextTick()
		this.reloadFlag = true
		this.excludes.splice(
			this.excludes.findIndex(v => v === name),
			1
		)
	}

	@Hook('BeforeUnmount')
	private unmount() {
		this.history.destroy()
	}
}
