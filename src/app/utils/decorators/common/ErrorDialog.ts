import { DialogOptions } from 'naive-ui'
import { toErrorMessage } from '../../common/error'
import { nDialog } from '../../naive'
import { createMethodDecorator } from '../help'

class DialogArguments {
	title?: string = '错误提示'
	content?: string = '操作出错！'
	showRetry?: boolean = false
	negativeText?: string = '关闭'
	positiveText?: string = '重试'
}

export function ErrorDialog(args: DialogArguments = new DialogArguments()) {
	const method = async (fn: () => any) => {
		try {
			return await fn()
		} catch (error) {
			const innerArgs = Object.assign(new DialogArguments(), args)
			const options: DialogOptions = {
				title: innerArgs.title,
				content: innerArgs.content + toErrorMessage(error),
				negativeText: innerArgs.negativeText,
			}
			if (innerArgs.showRetry) {
				options.positiveText = innerArgs.positiveText
				options.onPositiveClick = () => {
					method(fn)
				}
			}
			nDialog()?.error(options)
			return Promise.reject(error)
		}
	}
	return createMethodDecorator(method)
}
