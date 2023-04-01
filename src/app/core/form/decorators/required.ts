import { FormItemRule } from 'naive-ui/es/form/src/interface'
import { createDecorator, handleDecorator } from './utils'

type RequiredParams = [string | void, ((t: any) => boolean) | void]

export const Required = createDecorator<RequiredParams>('Required')

function handler(targetThis: Record<any, any>, rules: Record<string, FormItemRule>) {
	handleDecorator<RequiredParams>(targetThis, Required.MetadataKey, item => {
		let required = true
		const [msg, require] = item.options[0]
		if (typeof require === 'function') {
			required = require(targetThis)
		}
		rules[item.key].required = required
		if (msg) rules[item.key].message = msg
	})
}

export const RequiredHandler = {
	key: 'Required',
	handler,
}
