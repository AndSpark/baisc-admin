import HoverContainer from '@/app/components/common/hoverContainer'
import SvgIcon from '@/app/components/common/svgIcon'
import { RouterService } from '@/app/core/router/router.service'
import { Component, injectService, VueComponent } from 'vue3-oop'

@Component()
export default class ReloadButton extends VueComponent {
	routerService = injectService(RouterService)!

	handleClick() {
		console.log(11)
		this.routerService.reload()
	}

	render() {
		return (
			<HoverContainer
				tooltip-content='重新加载'
				placement='bottom-end'
				onClick={() => this.handleClick()}
			>
				<SvgIcon icon={'refresh'} class='w-4'></SvgIcon>
			</HoverContainer>
		)
	}
}
