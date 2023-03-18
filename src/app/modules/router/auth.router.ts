import AuthService from '@/app/core/authentication/auth.service'
import { RouterService } from '@/app/core/router/router.service'
import IndexRoute from '@/app/pages/index/index.route'
import LoginRoute from '@/app/pages/login/index.route'
import { nMessage } from '@/app/utils/naive'
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
				nMessage()?.success('登陆成功')
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
			if (!this.authService.hasLogin && to.name !== LoginRoute.name) {
				return {
					name: LoginRoute.name,
				}
			}
		})
	}
}
