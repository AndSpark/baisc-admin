import { Injectable } from 'injection-js'
import { darkTheme, GlobalTheme, useOsTheme } from 'naive-ui'
import { injectService, Mut, VueService } from 'vue3-oop'
import { LocalStorageService } from '../storage/storage.service'

export type Theme = GlobalTheme | null

@Injectable()
export default class ThemeService extends VueService {
	@Mut() theme: Theme = null
	private localStorageService = injectService(LocalStorageService)

	constructor() {
		super()

		const theme = this.localStorageService?.get('theme')
		if (!theme) {
			this.theme = useOsTheme().value === 'dark' ? darkTheme : null
		} else {
			this.theme = theme
		}
	}
}
