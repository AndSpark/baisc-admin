import { NConfigProvider } from 'naive-ui'
import { RouterView } from 'vue-router'
import { Component, VueComponent } from 'vue3-oop'
import AuthService from './core/authentication/auth.service'
import { HttpService } from './core/http/http'
import RouterStart from './core/router'
import { LocalStorageService } from './core/storage/storage.service'
import ThemeService from './core/theme/theme.service'

@Component({
	providers: [HttpService, AuthService, RouterStart, LocalStorageService, ThemeService],
})
export default class App extends VueComponent {
	render() {
		return (
			<NConfigProvider>
				<RouterView></RouterView>
			</NConfigProvider>
		)
	}
}
