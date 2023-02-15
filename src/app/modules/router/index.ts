import { RouterService } from '@/app/core/router/router.service'
import { Injectable } from 'injection-js'
import { injectService } from 'vue3-oop'
import AuthRouterService from './auth.router'
import LoadingRouterService from './loading.router'

@Injectable()
export default class RouterStart {
	routerService = injectService(RouterService)!

	constructor(
		private authRouterService: AuthRouterService,
		private loadingRouterService: LoadingRouterService
	) {
		this.routerService.initRoutes()
		this.loadingRouterService.init()
		this.authRouterService.init()
	}
}
