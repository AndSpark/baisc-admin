import HoverContainer from '@/app/components/common/hoverContainer'
import SvgIcon from '@/app/components/common/svgIcon'
import { RouterService } from '@/app/core/router/router.service'
import { Loading } from '@/app/decorators/common/loading'
import { sleep } from '@/app/utils/helper'
import { Component, injectService, Mut, VueComponent } from 'vue3-oop'

@Component()
export default class ReloadButton extends VueComponent {
	routerService = injectService(RouterService)!

	@Mut() loading = false

	@Loading()
	async handleClick() {
		this.routerService.reload()
		await sleep(1000)
	}

	render() {
		return (
			<HoverContainer
				tooltip-content='重新加载'
				placement='bottom-end'
				onClick={() => this.handleClick()}
			>
				<SvgIcon icon={'refresh'} class={['w-4', this.loading ? 'animate-spin' : '']}></SvgIcon>
			</HoverContainer>
		)
	}
}
