import { naiveProvider } from '@/app/utils/naive'
import {
	NDialogProvider,
	NLoadingBarProvider,
	NMessageProvider,
	NNotificationProvider,
	useDialog,
	useLoadingBar,
	useMessage,
	useNotification,
} from 'naive-ui'
import { VueComponent } from 'vue3-oop'

class NaiveProviderRegister extends VueComponent {
	constructor() {
		super()
		this.register()
	}
	register() {
		naiveProvider.loadingBar = useLoadingBar()
		naiveProvider.dialog = useDialog()
		naiveProvider.notification = useNotification()
		naiveProvider.message = useMessage()
	}

	render() {
		return <div></div>
	}
}

export default class NaiveProvider extends VueComponent {
	render() {
		return (
			<NLoadingBarProvider>
				<NDialogProvider>
					<NNotificationProvider>
						<NMessageProvider>
							{this.$slots.default!()}
							<NaiveProviderRegister></NaiveProviderRegister>
						</NMessageProvider>
					</NNotificationProvider>
				</NDialogProvider>
			</NLoadingBarProvider>
		)
	}
}
