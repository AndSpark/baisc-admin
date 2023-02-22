import { RouterService } from '@/app/core/router/router.service'
import { injectService, VueComponent } from 'vue3-oop'
import BlankLayout from './blank-layout'

export default class LayoutView extends VueComponent {
	routerService = injectService(RouterService)!

	init() {
		console.log(this.routerService.currentRoute)
	}

	render() {
		if (this.routerService.currentRoute.meta.layout === 'blank')
			return <BlankLayout>{this.$slots.default}</BlankLayout>
	}
}
