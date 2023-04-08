import SvgIcon from '@/app/components/common/svgIcon'
import ThemeService from '@/app/core/theme/theme.service'
import IndexRoute from '@/app/pages/index/index.route'
import { setProps } from '@/app/utils/helper/oop'
import APP_CONFIGS from '@/config'
import { RouterLink } from 'vue-router'
import { Component, injectService, VueComponent } from 'vue3-oop'

class BasicLogoProps {
	showTitle?: boolean = true
}

@Component()
export default class BasicLogo extends VueComponent<BasicLogoProps> {
	static defaultProps = setProps(BasicLogoProps)

	themeService = injectService(ThemeService)!

	render() {
		return (
			<RouterLink
				to={{ name: IndexRoute.name }}
				class='flex-x-center gap-2'
				style={{ width: this.themeService.theme.sider.width + 'px' }}
			>
				<SvgIcon icon={'vite'} class=' w-24px h-24px'></SvgIcon>
				<h2
					v-show={this.$props.showTitle}
					class='text-lg font-bold transition duration-300 ease-in-out truncate'
				>
					{APP_CONFIGS.ADMIN_TITLE}
				</h2>
			</RouterLink>
		)
	}
}
