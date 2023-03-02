import { RouterService } from '@/app/core/router/router.service'
import { Component, injectService, VueComponent } from 'vue3-oop'
import BasicLayout from './basic-layout'
import BlankLayout from './blank-layout'
@Component()
export default class LayoutView extends VueComponent {
	routerService = injectService(RouterService)!

	render() {
		if (this.routerService.currentRoute.meta.layout === 'blank') return <BlankLayout></BlankLayout>
		return <BasicLayout></BasicLayout>
	}
}
