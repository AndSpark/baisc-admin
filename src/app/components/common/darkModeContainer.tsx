import { VueComponent } from 'vue3-oop'

export default class DarkModeContainer extends VueComponent {
	render() {
		return (
			<div class='dark:bg-[#18181c] dark:text-white dark:text-opacity-82 transition-all duration-300 bg-white text-[#333639] ease-in-out '>
				{this.$slots.default?.()}
			</div>
		)
	}
}
