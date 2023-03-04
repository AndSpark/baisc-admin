import TabService from '@/app/core/router/tab.service'
import { mixColor } from '@/app/core/theme/color'
import ThemeService from '@/app/core/theme/theme.service'
import { NCarousel } from 'naive-ui'
import { Component, Computed, injectService, VueComponent } from 'vue3-oop'
import ChromeTab from './components/chrome-tab/index.vue'

@Component()
export default class BasicTab extends VueComponent {
	tabService = injectService(TabService)!
	themeService = injectService(ThemeService)!

	@Computed()
	get color() {
		return mixColor('#ffffff', this.themeService.theme.themeColor, 0.13)
	}

	render() {
		return (
			<div class='shadow'>
				<div class=' flex'>
					{this.tabService.tabs.map(v => (
						<ChromeTab
							key={v.fullPath}
							primaryColor={this.themeService.theme.themeColor}
							darkMode={this.themeService.theme.darkMode}
							onClose={() => this.tabService.removeTab(v.fullPath)}
							onClick={() => this.tabService.handleTabClick(v.fullPath)}
							isActive={v.fullPath === this.tabService.activeTabPath}
						>
							<i class={['iconfont mr-2 ', v.meta.icon]}></i>
							{v.meta.title}
						</ChromeTab>
					))}
				</div>
				<div class='h-1 ' style={{ background: this.color }}></div>
			</div>
		)
	}
}
