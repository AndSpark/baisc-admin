import NotifyService from '@/app/modules/notification/notify/notify.service'
import { Component, VueComponent } from 'vue3-oop'

@Component()
export default class NotificationPage extends VueComponent {
	constructor(private service: NotifyService) {
		super()
	}

	render() {
		return <div>{this.service.NForm()}</div>
	}
}
