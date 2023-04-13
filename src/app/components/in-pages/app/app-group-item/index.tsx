import SvgIcon, { SvgIconProps } from '@/app/components/common/svgIcon'
import { RouterService } from '@/app/core/router/router.service'
import { setProps } from '@/app/utils/helper/oop'
import { VueComponent, injectService, useProps } from 'vue3-oop'

class AppGroupItemProps {
	name = '标题'
	imageSrc?: string = undefined
	svgIcon?: SvgIconProps['icon'] = undefined
	routeName?: string = undefined
}

export default class AppGroupItem extends VueComponent<AppGroupItemProps> {
	static defaultProps = setProps(AppGroupItemProps)

	private routerService = injectService(RouterService)!

	handleClick() {
		this.routerService.router.push({ name: this.$props.routeName })
	}

	render() {
		return (
			<div
				class='inline-block text-center select-none cursor-pointer'
				onClick={() => this.handleClick()}
			>
				{!!this.$props.svgIcon && <SvgIcon icon={this.$props.svgIcon} class='!w-16 mb-1'></SvgIcon>}
				<div>{this.$props.name}</div>
			</div>
		)
	}
}
