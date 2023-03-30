import { getMetadataStorage } from 'class-validator'
import { ValidationArguments } from 'class-validator'
import { FormItemRule } from 'naive-ui'
import { handlerList } from './decorators'
import { TriggerHandler } from './decorators/trigger'
import { ValidationUtils } from './help'

export default abstract class Validator {
	private get validationMetas() {
		//@ts-ignore
		return getMetadataStorage().getTargetValidationMetadatas(this.constructor)
	}

	createRules(service: any) {
		const rules: Record<string, FormItemRule> = {}
		this.validationMetas.forEach(v => {
			const { validate, defaultMessage } = v.constraintCls.prototype
			rules[v.propertyName] = {
				validator: (rule: any, value: any) => {
					const validationArguments: ValidationArguments = {
						value,
						property: v.propertyName,
						targetName: v.target.constructor.name,
						constraints: v.constraints,
						object: this,
					}
					const isTrue = validate(value, validationArguments)
					const msg = ValidationUtils.replaceMessageSpecialTokens(
						defaultMessage(validationArguments),
						validationArguments
					)
					if (!isTrue) return new Error((v.message as string) || msg)
					return true
				},
			}
		})

		handlerList.forEach(v => v.handler(this, rules))

		return rules
	}
}
