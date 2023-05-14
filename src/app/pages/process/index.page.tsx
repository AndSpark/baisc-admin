import { RouterService } from '@/app/core/router/router.service'
import { authBpmnQueryApi } from 'szpt-driver-api'
import { Component, Mut, VueComponent, injectService } from 'vue3-oop'

@Component()
export default class ProcessPage extends VueComponent {
	routerService = injectService(RouterService)!

	@Mut() process: string = ''

	async init() {
		const id = this.routerService.currentRoute.query.id as string
		const process = await authBpmnQueryApi.process.detailById({ id, withFormData: true })
		this.process = JSON.stringify(process)
		window.parent.postMessage('hello', '*')
	}

	render() {
		return <div class='h-full w-full'>{this.process}</div>
	}
}
