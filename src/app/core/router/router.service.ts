import { getCurrentApp, getCurrentInjector, Hook, injectService, VueService } from 'vue3-oop'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { resolveInstances } from '@/app/utils/injection'
import { Injectable } from 'injection-js'
import AuthService from '../authentication/auth.service'
import { Subscription } from 'rxjs'

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
				this.router.push({ path: '/' })
			} else {
				this.router.push({ path: '/login' })
			}
		})
	}

	beforeEnter() {
		this.router.beforeEach((to, from) => {
			if (!this.authService.hasLogin && to.path !== '/login') {
				return {
					path: '/login',
				}
			}
		})
	}

	@Hook('BeforeUnmount')
	unmount() {
		this.authChangeSubcrition?.unsubscribe()
		this.history.destroy()
	}
}
