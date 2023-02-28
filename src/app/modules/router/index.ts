import { RouterService } from '@/app/core/router/router.service'
import { Injectable } from 'injection-js'
import { injectService } from 'vue3-oop'
import AuthRouterService from './auth.router'
import OtherRouterService from './other.router'

@Injectable()
export default class RouterStart {
	routerService = injectService(RouterService)!

	constructor(
		private authRouterService: AuthRouterService,
		private otherRouterService: OtherRouterService
	) {
		this.routerService.initRoutes()
		this.otherRouterService.init()
		this.authRouterService.init()
	}
}
