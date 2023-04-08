import SvgIcon from '@/app/components/common/svgIcon'
import { RouterService } from '@/app/core/router/router.service'
import { NButton } from 'naive-ui'
import { VueComponent, injectService } from 'vue3-oop'
import IndexRoute from '../index/index.route'

export default class NotFoundPage extends VueComponent {
	private routerService = injectService(RouterService)!

	handleBackClick() {
		this.routerService.router.push({
			name: IndexRoute.name,
		})
	}

	render() {
		return (
			<div class='h-full w-full flex-center flex-col'>
				<SvgIcon icon={'pageNotFound'} class='!w-1/2 max-w-[600px] mx-a mb-4'></SvgIcon>
				<NButton type={'primary'} onClick={() => this.handleBackClick()}>
					回到首页
				</NButton>
			</div>
		)
	}
}
