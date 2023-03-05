import { setProps } from '@/app/utils/helper/oop'
import { NTooltip, PopoverPlacement } from 'naive-ui'
import { Computed, VueComponent } from 'vue3-oop'

class HoverContainerProps {
	/** tooltip显示文本 */
	tooltipContent?: string = undefined
	/** tooltip的位置 */
	placement?: PopoverPlacement = 'bottom-end'
	/** class类 */
	contentClass?: string = undefined
	/** 反转模式下 */
	inverted?: boolean = undefined

	onClick?: () => any = undefined
}

export default class HoverContainer extends VueComponent<HoverContainerProps> {
	static defaultProps = setProps(HoverContainerProps)

	@Computed()
	get showToolTip() {
		return !!this.$props.tooltipContent
	}

	@Computed()
	get contentClassName() {
		return `${this.$props.contentClass} ${
			this.$props.inverted ? 'hover:bg-primary' : 'hover:bg-[#f6f6f6]'
		}`
	}

	render() {
		if (this.showToolTip)
			return (
				<NTooltip
					placement={this.$props.placement}
					trigger='hover'
					v-slots={{
						trigger: () => (
							<div
								onClick={() => this.$props.onClick?.()}
								class={[
									'flex-center cursor-pointer px-2 dark:hover:bg-[#333]  ',
									this.contentClassName,
								]}
							>
								{this.$slots.default?.()}
							</div>
						),
					}}
				>
					{this.$props.tooltipContent}
				</NTooltip>
			)
		return (
			<div class={['flex-center cursor-pointer dark:hover:bg-[#333]', this.contentClassName]}>
				{this.$slots.default?.()}
			</div>
		)
	}
}
