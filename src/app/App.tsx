import { NConfigProvider } from 'naive-ui'
import { Component, injectService, VueComponent } from 'vue3-oop'
import NaiveProvider from './components/layout/naive-provider'
import AuthService from './core/authentication/auth.service'
import { HttpService } from './core/http/http'
import { RouterService } from './core/router/router.service'
import { LocalStorageService } from './core/storage/storage.service'
import ThemeService from './modules/theme/theme.service'
import RouterStart from './modules/router'
import { RouterView } from 'vue-router'
@Component({
	providers: [
		HttpService,
		AuthService,
		RouterService,
		RouterStart,
		LocalStorageService,
		ThemeService,
	],
})
export default class App extends VueComponent {
	themeService = injectService(ThemeService)
	render() {
		return (
			<NConfigProvider theme={this.themeService?.theme}>
				<NaiveProvider>
					<RouterView></RouterView>
				</NaiveProvider>
			</NConfigProvider>
		)
	}
}
