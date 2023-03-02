import TabService from '@/app/core/router/tab.service'
import ThemeService from '@/app/core/theme/theme.service'
import { Component, injectService, VueComponent } from 'vue3-oop'
import ChromeTab from './components/chrome-tab/index.vue'

@Component()
export default class BasicTab extends VueComponent {
	tabService = injectService(TabService)!
	themeService = injectService(ThemeService)!

	render() {
		return (
			<div class='shadow px-4'>
				{this.tabService.tabs.map(v => (
					<ChromeTab
						key={v.fullPath}
						primaryColor={this.themeService.theme.themeColor}
						darkMode={this.themeService.theme.darkMode}
						onClose={() => this.tabService.removeTab(v.fullPath)}
						onClick={() => this.tabService.handleTabClick(v.fullPath)}
						isActive={v.fullPath === this.tabService.activeTabPath}
					>
						<i class={['iconfont', v.meta.icon]}></i>
						{v.meta.title}
					</ChromeTab>
				))}
			</div>
		)
	}
}
