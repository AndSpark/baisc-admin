import { getMetadataStorage } from 'class-validator'
import { ValidationArguments } from 'class-validator'
import { instanceToPlain } from 'class-transformer'
import { FormItemRule } from 'naive-ui'
import { handlerList } from './decorators'
import { ValidationUtils } from './help'

export default abstract class Validator {
	createRules() {
		const rules: Record<string, FormItemRule> = {}
		const validators: Record<string, ((rule: any, value: any) => any)[]> = {}

		this.validationMetas.forEach(v => {
			const { validate, defaultMessage } = v.constraintCls.prototype
			const key = v.propertyName
			if (!validators[key]) validators[key] = []
			const validator = (rule: any, value: any) => {
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
				const message = (v.message as string) || msg
				if (rule.message) rule.message = message
				if (!isTrue) return new Error(message)
				return true
			}
			validators[key].push(validator)
			rules[key] = {}
		})

		for (const key in rules) {
			rules[key].validator = (rule: any, value: any) => {
				for (const validator of validators[key]) {
					const res = validator(rule, value)
					if (res !== true) return res
				}
			}
		}

		handlerList.forEach(v => v.handler(this, rules))

		return rules
	}

	private get validationMetas() {
		//@ts-ignore
		return getMetadataStorage().getTargetValidationMetadatas(this.constructor)
	}

	toPlain() {
		return instanceToPlain(this)
	}
}
