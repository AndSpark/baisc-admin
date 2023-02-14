import { DialogApiInjection } from 'naive-ui/es/dialog/src/DialogProvider'
import { LoadingBarInst } from 'naive-ui/es/loading-bar/src/LoadingBarProvider'
import { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'
import { NotificationApiInjection } from 'naive-ui/es/notification/src/NotificationProvider'

type NaiveProvider = {
	loadingBar?: LoadingBarInst
	message?: MessageApiInjection
	dialog?: DialogApiInjection
	notification?: NotificationApiInjection
}

export const naiveProvider: NaiveProvider = {
	loadingBar: undefined,
	message: undefined,
	dialog: undefined,
	notification: undefined,
}

export const nMessage = () => naiveProvider.message
export const nLoadingBar = () => naiveProvider.loadingBar
export const nDialog = () => naiveProvider.dialog
export const nNotification = () => naiveProvider.notification
