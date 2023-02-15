import { RouterService } from '@/app/core/router/router.service'
import { nLoadingBar } from '@/app/utils/naive'
import { Injectable } from 'injection-js'
import { injectService } from 'vue3-oop'

@Injectable()
export default class LoadingRouterService {
	routerService = injectService(RouterService)!

	init() {
		this.each()
	}

	each() {
		this.routerService.router.beforeEach((to, from) => {
			nLoadingBar()?.start()
		})
		this.routerService.router.afterEach((to, from) => {
			nLoadingBar()?.finish()
		})
	}
}
