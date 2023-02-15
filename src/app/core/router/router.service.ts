import { getCurrentApp, Hook, injectService, VueService } from 'vue3-oop'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { resolveInstances } from '@/app/utils/injection'
import { Injectable } from 'injection-js'
import AuthService from '../authentication/auth.service'
import { Subscription } from 'rxjs'
import { nLoadingBar, nMessage } from '@/app/utils/naive'
import LoginRoute from '@/app/pages/login/index.route'
import IndexRoute from '@/app/pages/index/index.route'

@Injectable()
export class RouterService extends VueService {
	authService = injectService(AuthService)!
	authChangeSubcrition: Subscription | null = null

	history = createWebHistory()
	router!: Router
	get currentRoute() {
		return this.router.currentRoute.value
	}
	app = getCurrentApp()!
	// 为了解决热更新循环引用,采用函数传参初始化
	initRoutes(routes: any[]) {
		this.router = createRouter({
			history: this.history,
			routes: resolveInstances(routes),
		})
		this.subscribe()
		this.beforeEnter()

		this.app.use(this.router)
	}

	subscribe() {
		this.authChangeSubcrition = this.authService.change$.subscribe(user => {
			if (user) {
				this.router.push({ name: IndexRoute.name })
				nMessage()?.success('登陆成功')
			} else {
				this.router.push({ name: LoginRoute.name })
			}
		})
	}

	beforeEnter() {
		this.router.beforeEach((to, from) => {
			nLoadingBar()?.start()
			if (!this.authService.hasLogin && to.name !== LoginRoute.name) {
				return {
					path: '/login',
				}
			}
		})
		this.router.afterEach((to, from) => {
			nLoadingBar()?.finish()
		})
	}

	@Hook('BeforeUnmount')
	unmount() {
		this.authChangeSubcrition?.unsubscribe()
		this.history.destroy()
	}
}
