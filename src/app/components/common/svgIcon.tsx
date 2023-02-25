import { setProps } from '@/app/utils/helper/oop'
import { VueComponent } from 'vue3-oop'
import svgIcons from '@/assets/svg'
import { h } from 'vue'

class SvgIconProps {
	icon: 'vite' | undefined = undefined
}

export default class SvgIcon extends VueComponent<SvgIconProps> {
	static defaultProps = setProps(SvgIconProps)

	render() {
		return h(svgIcons[this.$props.icon!])
	}
}