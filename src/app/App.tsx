import { NConfigProvider } from 'naive-ui'
import { Component, injectService, VueComponent } from 'vue3-oop'
import NaiveProvider from './components/layout/naive-provider'
import AuthService from './core/authentication/auth.service'
import { HttpService } from './core/http/http'
import { RouterService } from './core/router/router.service'
import RouterStart from './modules/router'
import { RouterView } from 'vue-router'
import ThemeService from './core/theme/theme.service'
import TabService from './core/router/tab.service'
import './decorators/vue3-oop/index'
import WebSocketService from './core/websocket/websocket.service'

@Component({
	providers: [
		HttpService,
		AuthService,
		RouterService,
		RouterStart,
		WebSocketService,
		ThemeService,
		TabService,
	],
})
export default class App extends VueComponent {
	themeService = injectService(ThemeService)!
	render() {
		return (
			<NConfigProvider
				class='h-full'
				theme={this.themeService.naiveTheme}
				themeOverrides={this.themeService.naiveThemeOverrides}
			>
				<NaiveProvider>
					<RouterView></RouterView>
				</NaiveProvider>
			</NConfigProvider>
		)
	}
}
