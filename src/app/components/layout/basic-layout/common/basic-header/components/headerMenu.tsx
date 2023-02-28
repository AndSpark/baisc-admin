import { RouterService } from '@/app/core/router/router.service'
import { Injectable, SkipSelf } from 'injection-js'
import { NMenu } from 'naive-ui'
import { VueComponent } from 'vue3-oop'

@Injectable()
export default class HeaderMenu extends VueComponent {
	constructor(@SkipSelf() private routerService: RouterService) {
		super()
	}

	render() {
		console.log(this.routerService.menu)
		return (
			<div>
				<NMenu options={this.routerService.menu} mode={'horizontal'}></NMenu>
			</div>
		)
	}
}
