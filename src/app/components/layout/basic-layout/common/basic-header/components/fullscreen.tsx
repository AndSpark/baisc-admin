import HoverContainer from '@/app/components/common/hoverContainer'
import SvgIcon from '@/app/components/common/svgIcon'
import { useFullscreen } from '@vueuse/core'
import { ref, Ref } from 'vue'
import { Computed, VueComponent } from 'vue3-oop'

export default class Fullscreen extends VueComponent {
	isFullscreen: Ref<boolean> = ref(false)
	toggle?: () => Promise<void>

	constructor() {
		super()
		const { isFullscreen, toggle } = useFullscreen()
		this.isFullscreen = isFullscreen
		this.toggle = toggle
	}

	@Computed()
	get tooltip() {
		return this.isFullscreen.value ? '退出全屏' : '全屏'
	}

	handleClick() {
		this.toggle!()
	}

	render() {
		return (
			<HoverContainer
				contentClass='h-full w-10'
				tooltip-content={this.tooltip}
				onClick={() => this.handleClick()}
			>
				<SvgIcon
					class='w-6  '
					icon={this.isFullscreen.value ? 'fullscreenExit' : 'fullscreen'}
				></SvgIcon>
			</HoverContainer>
		)
	}
}
