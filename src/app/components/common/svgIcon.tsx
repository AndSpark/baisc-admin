import { setProps } from '@/app/utils/helper/oop'
import { VueComponent } from 'vue3-oop'
import { h } from 'vue'

export class SvgIconProps {
	icon:
		| 'vite'
		| 'refresh'
		| 'fullscreen'
		| 'fullscreenExit'
		| 'sun'
		| 'moon'
		| 'notification'
		| 'map'
		| 'avatar'
		| 'logout'
		| undefined = undefined
}

const svgs = import.meta.glob('../../../assets//svg/*.svg', {
	eager: true,
	import: 'default',
}) as any

export default class SvgIcon extends VueComponent<SvgIconProps> {
	static defaultProps = setProps(SvgIconProps)

	render() {
		for (const key in svgs) {
			if (key.includes(this.$props.icon!)) {
				return h(svgs[key], {
					class: 'dark:fill-white dark:fill-opacity-82 w-4 ',
				})
			}
		}
	}
}
