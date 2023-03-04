import DarkModeContainer from '@/app/components/common/darkModeContainer'
import TabService from '@/app/core/router/tab.service'
import { mixColor } from '@/app/core/theme/color'
import ThemeService from '@/app/core/theme/theme.service'
import { NCarousel } from 'naive-ui'
import { TransitionGroup } from 'vue'
import { Component, Computed, injectService, VueComponent } from 'vue3-oop'
import ChromeTab from './components/chrome-tab/index.vue'
import ReloadButton from './components/reload-button'

@Component()
export default class BasicTab extends VueComponent {
	tabService = injectService(TabService)!
	themeService = injectService(ThemeService)!

	@Computed()
	get color() {
		if (this.themeService.theme.darkMode) {
			return mixColor('#000', this.themeService.theme.themeColor, 0.33)
		}
		return mixColor('#ffffff', this.themeService.theme.themeColor, 0.13)
	}

	render() {
		return (
			<DarkModeContainer class='shadow-sm'>
				<div class='flex '>
					<div class=' flex pr-5' style='width:calc(100% - 34px)'>
						<TransitionGroup name='tab'>
							{this.tabService.tabs.map(v => (
								<ChromeTab
									key={v.fullPath}
									primaryColor={this.themeService.theme.themeColor}
									darkMode={this.themeService.theme.darkMode}
									onClose={() => this.tabService.removeTab(v.fullPath)}
									onClick={() => this.tabService.handleTabClick(v.fullPath)}
									isActive={v.fullPath === this.tabService.activeTabPath}
								>
									<div>
										<i class={['iconfont mr-2 ', v.meta.icon]}></i>
										{v.meta.title}
									</div>
								</ChromeTab>
							))}
						</TransitionGroup>
					</div>
					<ReloadButton></ReloadButton>
				</div>

				<div class='h-0.5 ' style={{ background: this.color }}></div>
			</DarkModeContainer>
		)
	}
}
