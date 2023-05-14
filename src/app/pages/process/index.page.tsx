import { createProcessService } from '@/app/core/process/process.service'
import { RouterService } from '@/app/core/router/router.service'
import { Component, Computed, Mut, VueComponent, injectService } from 'vue3-oop'

@Component()
export default class ProcessPage extends VueComponent {
	routerService = injectService(RouterService)!
	processService = createProcessService('csadsad')

	@Computed()
	get loading() {
		return this.processService.loading
	}

	@Mut() process: string = ''

	async init() {
		console.log(this.processService)
	}

	render() {
		return <div class='h-full w-full'>hhhhhhhh</div>
	}
}
