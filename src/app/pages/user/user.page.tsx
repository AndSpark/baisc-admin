import { NInput } from 'naive-ui'
import { Component, VueComponent } from 'vue3-oop'

@Component()
export default class UserPage extends VueComponent {
	render() {
		return (
			<div>
				用户管理
				<NInput></NInput>
			</div>
		)
	}
}
