import AuthService from '@/app/core/authentication/auth.service'
import { RouterService } from '@/app/core/router/router.service'
import NotFoundRoute from '@/app/pages/404/404.route'
import IndexRoute from '@/app/pages/index/index.route'
import LoginRoute from '@/app/pages/login/index.route'
import { nNotification } from '@/app/utils/naive'
import { toTimeCN } from '@/app/utils/time'
import { Injectable } from 'injection-js'
import { Subscription } from 'rxjs'
import { Hook, injectService, VueService } from 'vue3-oop'

@Injectable()
export default class AuthRouterService extends VueService {
	authChangeSubcrition: Subscription | null = null
	authService = injectService(AuthService)!
	routerService = injectService(RouterService)!

	init() {
		this.authService.getMe()
		this.subscribe()
		this.beforeEnter()
	}

	subscribe() {
		this.authChangeSubcrition = this.authService.change$.subscribe(user => {
			if (user) {
				this.routerService.router.push({ name: IndexRoute.name })
				nNotification()?.success({
					title: '欢迎回来',
					description: toTimeCN(),
					duration: 3000,
				})
			} else {
				this.routerService.router.push({ name: LoginRoute.name })
			}
		})
	}

	@Hook('BeforeUnmount')
	unsubscribe() {
		this.authChangeSubcrition?.unsubscribe()
	}

	beforeEnter() {
		this.routerService.router.beforeEach((to, from) => {
			if (!this.routerService.router.hasRoute(to.name!)) {
				return {
					name: NotFoundRoute.name,
				}
			}

			if (!this.authService.hasLogin && to.name !== LoginRoute.name) {
				return {
					name: LoginRoute.name,
				}
			}
		})
	}
}
