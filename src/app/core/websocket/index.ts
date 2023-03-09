import { injectService, VueService } from 'vue3-oop'
import AuthService from '@/app/core/authentication/auth.service'
import { RxStomp } from '@stomp/rx-stomp'
import { Injectable } from 'injection-js'
import { first, from, Subscription, timeout, timer } from 'rxjs'
import { v4 } from 'uuid'
import { Topic, TopicHandler, TopicHandlers } from './type'

@Injectable()
export default class WebSocketService extends VueService {
	authService = injectService(AuthService)!

	private rxStomp: RxStomp = new RxStomp()
	private brokerURL = `${location.protocol.startsWith('https') ? 'wss' : 'ws'}://${
		location.host
	}/api/auth/ws/endpoint`
	private topicHandlers: TopicHandlers = {}
	private topicSubscrition: {
		[x in Topic]?: Subscription
	} = {}

	connect() {
		this.rxStomp.configure({
			brokerURL: this.brokerURL,
			connectHeaders: {
				Authorization: this.authService.token!.token,
			},
			reconnectDelay: 5000,
			heartbeatIncoming: 0, // server to client
			heartbeatOutgoing: 15000,
		})
		this.rxStomp.activate()

		this.authService.change$.pipe(first()).subscribe(user => {
			if (!user) {
				this.close()
			}
		})
	}

	subscribe<T extends Topic>(destination: T, handler: TopicHandler<T>) {
		if (this.topicHandlers[destination]) {
			this.topicHandlers[destination]!.push(handler)
		} else {
			this.topicHandlers[destination] = [handler]
			this.topicSubscrition[destination] = this.rxStomp
				.watch({
					destination,
				})
				.subscribe(val => {
					this.topicHandlers[destination]!.forEach(res => res(val))
				})
		}
	}

	unsubscribe<T extends Topic>(destination: T, handler: TopicHandler<T>) {
		const index = this.topicHandlers[destination]?.findIndex(v => v === handler)
		if (index !== undefined && index > -1) {
			this.topicHandlers[destination]?.splice(index, 1)
			if (this.topicHandlers[destination]?.length === 0) {
				this.topicSubscrition[destination]?.unsubscribe()
				this.topicSubscrition[destination] = undefined
			}
		}
	}

	publish(destination: string, body: string) {
		const receiptId = v4()
		this.rxStomp.publish({
			headers: {
				Authorization: this.authService.token!.token,
				receipt: receiptId,
			},
			destination,
			body,
		})
		return from(this.rxStomp.asyncReceipt('receiptId')).pipe(
			timeout({
				first: 5000,
			})
		)
	}

	private heartbeat() {}

	close() {
		this.rxStomp.deactivate()
	}
}
