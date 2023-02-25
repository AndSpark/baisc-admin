import IndexRoute from '@/app/pages/index/index.route'
import { setProps } from '@/app/utils/helper/oop'
import APP_CONFIGS from '@/config'
import { RouterLink } from 'vue-router'
import { VueComponent } from 'vue3-oop'

class BasicLogoProps {
	showTitle: boolean = true
}

export default class BasicLogo extends VueComponent<BasicLogoProps> {
	static defaultProps = setProps(BasicLogoProps)

	render() {
		return (
			<RouterLink to={IndexRoute.name}>
				<h2
					v-show={this.$props.showTitle}
					class='pl-2 font-bold transition duration-300 ease-in-out'
				>
					{APP_CONFIGS.ADMIN_TITLE}
				</h2>
			</RouterLink>
		)
	}
}