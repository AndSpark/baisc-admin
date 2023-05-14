import { InjectionToken, Provider } from 'injection-js'
import { WebSocketService } from 'szjw-ws'
import { authBpmnQueryApi } from 'szpt-driver-api'
import type { ProcessDTO } from 'szpt-driver-api/authBpmnQuery'
import { Computed, Hook, Mut, VueService, createCurrentInjector, injectService } from 'vue3-oop'

export default class ProcessService extends VueService {
	private websocketService = injectService(WebSocketService)!

	constructor(public id: string) {
		super()
	}

	@Mut() process?: ProcessDTO
	@Mut() loading = false

	@Computed()
	get processTasks() {
		return this.process?.tasks
	}

	@Hook('BeforeMount')
	async fetchProcessData() {
		this.loading = true
		try {
			this.process = await authBpmnQueryApi.process.detailById({
				id: this.id,
				withTasks: true,
				withFormData: true,
			})
		} catch (error: any) {
			throw new Error(error)
		} finally {
			this.loading = false
		}
	}
}

const PROCESS_ID = new InjectionToken<string>('processId')

const ProcessProvider: Provider = {
	provide: ProcessService,
	useFactory: (processId: string) => {
		return new ProcessService(processId)
	},
	deps: [PROCESS_ID],
}

export const createProcessService = (id: string) => {
	return createCurrentInjector([ProcessProvider, { provide: PROCESS_ID, useValue: id }]).get(
		ProcessService
	) as ProcessService
}
