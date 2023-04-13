import SvgIcon from '@/app/components/common/svgIcon'
import { RouterService } from '@/app/core/router/router.service'
import { NButton } from 'naive-ui'
import { VueComponent, injectService } from 'vue3-oop'
import IndexRoute from '../index/index.route'
import AppGroup from '@/app/components/in-pages/app/app-group'

export default class AppPage extends VueComponent {
	private routerService = injectService(RouterService)!

	render() {
		return (
			<div class='w-full flex flex-y-center flex-col pt-4'>
				<AppGroup class='max-w-5xl' title='消息'></AppGroup>
			</div>
		)
	}
}
