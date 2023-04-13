import { injectService, VueService } from 'vue3-oop'
import AuthService from '@/app/core/authentication/auth.service'
import { RxStomp, RxStompState } from '@stomp/rx-stomp'
import { Injectable } from 'injection-js'
import {
	BehaviorSubject,
	catchError,
	first,
	from,
	interval,
	Subject,
	Subscription,
	tap,
	timeout,
	timer,
} from 'rxjs'
import { v4 } from 'uuid'
import { TopicHandler, TopicHandlers, WebsocketConnectionState } from './type'
import { EnumPublishDestination, EnumTopic, InformWebsocketText, InformWebsocketType } from './enum'
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
	private timeout = 5000

	private disconnect$ = new Subject()

	public readonly connectionState$ = new BehaviorSubject<WebsocketConnectionState>({
		type: 'none',
		message: '未连接',
	})

	constructor() {
		super()

		if (this.authService.token) this.connect()

		this.authService.change$.subscribe(user => {
			if (!isDefine(user)) {
				this.disconnect()
			} else {
				this.connect()
			}
		})
	}

	connect() {
		this.configure()
		this.rxStomp.activate()
		this.heartbeatSubscribe()
		this.stateSubscribe()
	}

	disconnect() {
		this.rxStomp.deactivate()
		this.disconnect$.next(true)
		this.disconnect$.unsubscribe()
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
		return from(this.rxStomp.asyncReceipt(receiptId)).pipe(
			timeout({
				first: this.timeout,
			})
		)
	}

	private stateSubscribe() {
		const stompErrorsSub = this.rxStomp.stompErrors$.subscribe(val => {
			this.connectionState$.next({
				type: InformWebsocketType['3'],
				message: InformWebsocketText['3'] + val.body,
			})
		})
		const webSocketErrorsSub = this.rxStomp.webSocketErrors$.subscribe(val => {
			this.connectionState$.next({
				type: InformWebsocketType['3'],
				message: InformWebsocketText['3'] + val.type,
			})
		})
		const connectionStateSub = this.rxStomp.connectionState$.subscribe(val => {
			this.connectionState$.next({
				type: InformWebsocketType[val],
				message: InformWebsocketText[val],
			})
			if (val !== 1) {
				this.rxStomp.activate()
			}
		})
		this.disconnect$.subscribe(val => {
			stompErrorsSub.unsubscribe()
			webSocketErrorsSub.unsubscribe()
			connectionStateSub.unsubscribe()
		})
	}

	private configure() {
		this.rxStomp.configure({
			brokerURL: this.brokerURL,
			connectHeaders: {
				Authorization: this.authService.token!.token,
			},
			reconnectDelay: 5000,
			heartbeatIncoming: 0, // server to client
			heartbeatOutgoing: this.timeout,
		})
	}

	private heartbeatSubscribe() {
		const heartbeatSubscrition = interval(this.timeout).subscribe(() =>
			this.publish(EnumPublishDestination.HEARTBEAT, Date.now().toString()).subscribe({
				complete: () => {},
				error: e => {
					this.rxStomp.deactivate({ force: true })
				},
			})
		)
		this.disconnect$.subscribe(val => {
			heartbeatSubscrition.unsubscribe()
		})
	}
}
