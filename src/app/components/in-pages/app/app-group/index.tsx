import { setProps } from '@/app/utils/helper/oop'
import { NCard } from 'naive-ui'
import { VueComponent } from 'vue3-oop'
import AppGroupItem from '../app-group-item'

class AppGroupProps {
	title = '标题'
}

export default class AppGroup extends VueComponent<AppGroupProps> {
	static defaultProps = setProps(AppGroupProps)

	render() {
		return (
			<NCard title={this.$props.title}>
				<AppGroupItem svgIcon={'mail'} name='发送消息'></AppGroupItem>
			</NCard>
		)
	}
}
