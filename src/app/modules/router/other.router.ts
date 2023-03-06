import { RouterService } from '@/app/core/router/router.service'
import TabService from '@/app/core/router/tab.service'
import { nLoadingBar } from '@/app/utils/naive'
import { useTitle } from '@vueuse/core'
import { Injectable } from 'injection-js'
import { injectService } from 'vue3-oop'

@Injectable()
export default class OtherRouterService {
	routerService = injectService(RouterService)!
	tabService = injectService(TabService)!

	init() {
		this.each()
	}

	each() {
		this.routerService.router.beforeEach((to, from) => {
			nLoadingBar()?.start()
			useTitle(to.meta.title)
			this.tabService.beforeRouteEnter(to)
		})
		this.routerService.router.afterEach((to, from) => {
			nLoadingBar()?.finish()
		})
	}
}
