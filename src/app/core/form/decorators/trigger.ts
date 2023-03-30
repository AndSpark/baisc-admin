import { FormItemRule, ValidationTrigger } from 'naive-ui/es/form/src/interface'
import { createDecorator, handleDecorator } from './utils'

export const Trigger = createDecorator<[ValidationTrigger[]]>('Trigger')

function handler(targetThis: Record<any, any>, rules: Record<string, FormItemRule>) {
	handleDecorator(targetThis, Trigger.MetadataKey, item => {
		if (item.key === undefined) {
			for (const key in targetThis) {
				if (!rules[key].trigger) {
					rules[key].trigger = item.options[0][0]
				}
			}
		} else {
			rules[item.key].trigger = item.options[0][0]
		}
	})
}

export const TriggerHandler = {
	key: 'Trigger',
	handler,
}
