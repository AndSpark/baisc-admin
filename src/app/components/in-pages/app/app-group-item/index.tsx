import SvgIcon, { SvgIconProps } from '@/app/components/common/svgIcon'
import { setProps } from '@/app/utils/helper/oop'
import { VueComponent, useProps } from 'vue3-oop'

class AppGroupItemProps {
	name = '标题'
	imageSrc?: string = undefined
	svgIcon?: SvgIconProps['icon'] = undefined
	routeName?: string = undefined
}

export default class AppGroupItem extends VueComponent<AppGroupItemProps> {
	static defaultProps = setProps(AppGroupItemProps)

	render() {
		return (
			<div class='flex flex-col flex-y-center w-auto '>
				{!!this.$props.svgIcon && <SvgIcon icon={this.$props.svgIcon} class='!w-16'></SvgIcon>}
				<div>{this.$props.name}</div>
			</div>
		)
	}
}
