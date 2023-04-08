import DarkModeContainer from '@/app/components/common/darkModeContainer'
import HoverContainer from '@/app/components/common/hoverContainer'
import SvgIcon from '@/app/components/common/svgIcon'
import { RouterService } from '@/app/core/router/router.service'
import CssRender from 'css-render'
import { Injectable, SkipSelf } from 'injection-js'
import { NMenu, NScrollbar } from 'naive-ui'
import { VueComponent } from 'vue3-oop'

@Injectable()
export default class HeaderMenu extends VueComponent {
	constructor(@SkipSelf() private routerService: RouterService) {
		super()
	}

	render() {
		return (
			<div class='flex h-full'>
				{this.routerService.menu.map(v => (
					<HoverContainer
						contentClass='h-full min-w-16 mx-1'
						onClick={() => {
							this.routerService.router.push({
								name: v.routeName,
							})
						}}
					>
						<div class='flex w-full h-full flex-center flex-col '>
							{v.icon?.()}
							<div class='truncate '>{v.routeMeta.title}</div>
						</div>
					</HoverContainer>
				))}
			</div>
		)
	}
}
