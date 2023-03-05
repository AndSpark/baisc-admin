import HoverContainer from '@/app/components/common/hoverContainer'
import SvgIcon from '@/app/components/common/svgIcon'
import ThemeService from '@/app/core/theme/theme.service'
import { Component, injectService, VueComponent } from 'vue3-oop'

@Component()
export default class DarkMode extends VueComponent {
	themeService = injectService(ThemeService)!

	render() {
		return (
			<HoverContainer
				contentClass='h-full'
				tooltipContent='主题模式'
				onClick={() => this.themeService.setDarkMode()}
			>
				<SvgIcon class='w-4' icon={this.themeService.theme.darkMode ? 'moon' : 'sun'}></SvgIcon>
			</HoverContainer>
		)
	}
}
