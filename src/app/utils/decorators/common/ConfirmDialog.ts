import { DialogOptions } from 'naive-ui'
import { nDialog } from '../../naive'
import { createMethodDecorator } from '../help'

class ConfirmDialogArguments {
	title?: string = '提示'
	content?: string = '确定要这样吗？'
	negativeText?: string = '取消'
	positiveText?: string = '确定'
}

export function ConfirmDialog(args: ConfirmDialogArguments = new ConfirmDialogArguments()) {
	const method = async (fn: () => any) => {
		const innerArgs = Object.assign(new ConfirmDialogArguments(), args)
		const options: DialogOptions = {
			...innerArgs,
			onPositiveClick: () => {
				fn()
			},
		}
		nDialog()?.warning(options)
	}
	return createMethodDecorator(method)
}
