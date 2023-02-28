import DarkModeContainer from '@/app/components/common/darkModeContainer'
import { RouterService } from '@/app/core/router/router.service'
import { Injectable, SkipSelf } from 'injection-js'
import { NMenu } from 'naive-ui'
import { VueComponent } from 'vue3-oop'

@Injectable()
export default class BasicSider extends VueComponent {
	constructor(@SkipSelf() private routerService: RouterService) {
		super()
	}

	render() {
		return (
			<DarkModeContainer class='  h-full'>
				<NMenu options={this.routerService.menu}></NMenu>
			</DarkModeContainer>
		)
	}
}
