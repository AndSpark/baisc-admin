import { injectService, VueService } from 'vue3-oop'
import AuthService from '@/app/core/authentication/auth.service'
import { RxStomp, RxStompState } from '@stomp/rx-stomp'
import { Injectable } from 'injection-js'
import { first, from, interval, Subscription, timeout, timer } from 'rxjs'
import { v4 } from 'uuid'
import { TopicHandler, TopicHandlers } from './type'
import { EnumPublishDestination, EnumTopic } from './enum'
import { isDefine } from '@/app/utils/common/typeof'

@Injectable()
export default class WebSocketService extends VueService {
	private authService = injectService(AuthService)!
	private rxStomp: RxStomp = new RxStomp()
	private brokerURL = `${location.protocol.startsWith('https') ? 'wss' : 'ws'}://${
		location.host
	}/api/auth/ws/endpoint`
	private topicHandlers: TopicHandlers = {}
	private topicSubscrition: Partial<Record<EnumTopic, Subscription>> = {}
	private heartbeatSubscrition: Subscription | null = null

	constructor() {
		super()

		if (this.authService.token) this.connect()

		this.authService.change$.subscribe(user => {
			if (!isDefine(user)) {
				this.close()
			} else {
				this.connect()
			}
		})
	}

	connect() {
		this.configure()
		this.rxStomp.activate()
		this.heartbeatSubscribe()
	}

	close() {
		this.rxStomp.deactivate()
		this.unsubscribeAll()
	}

	subscribe<T extends EnumTopic>(destination: T, handler: TopicHandler<T>) {
		if (this.topicHandlers[destination]) {
			this.topicHandlers[destination]!.push(handler)
		} else {
			this.topicHandlers[destination] = [handler]
			this.topicSubscrition[destination] = this.rxStomp
				.watch({
					destination,
				})
				.subscribe(val => {
					this.topicHandlers[destination]!.forEach(res => res(JSON.parse(val.body)))
				})
		}
	}

	unsubscribe<T extends EnumTopic>(destination: T, handler: TopicHandler<T>) {
		const index = this.topicHandlers[destination]?.findIndex(v => v === handler)
		if (index !== undefined && index > -1) {
			this.topicHandlers[destination]?.splice(index, 1)
			if (this.topicHandlers[destination]!.length === 0) {
				this.topicSubscrition[destination]?.unsubscribe()
				this.topicSubscrition[destination] = undefined
			}
		}
	}

	unsubscribeAll() {
		for (const destination in this.topicSubscrition) {
			this.topicSubscrition[destination as EnumTopic]!.unsubscribe()
			this.topicSubscrition[destination as EnumTopic] = undefined
		}
		this.heartbeatSubscrition?.unsubscribe()
	}

	publish(destination: EnumPublishDestination, body: string) {
		const receiptId = v4()
		this.rxStomp.publish({
			headers: {
				receipt: receiptId,
			},
			destination,
			body,
		})
		return from(this.rxStomp.asyncReceipt('receiptId')).pipe(
			timeout({
				first: 15000,
			})
		)
	}

	private configure() {
		this.rxStomp.configure({
			brokerURL: this.brokerURL,
			connectHeaders: {
				Authorization: this.authService.token!.token,
			},
			reconnectDelay: 5000,
			heartbeatIncoming: 0, // server to client
			heartbeatOutgoing: 15000,
		})
	}

	private heartbeatSubscribe() {
		this.heartbeatSubscrition = interval(15000).subscribe(() =>
			this.publish(EnumPublishDestination.HEARTBEAT, Date.now().toString())
		)
	}
}
