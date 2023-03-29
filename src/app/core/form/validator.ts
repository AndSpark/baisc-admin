const validatorRuleMap = new Map()
import * as validater from 'class-validator'
import { FormItemRule as Rule2 } from 'naive-ui'

type FormItemRule<T> = ((service: T) => Rule2) | Rule2

export default abstract class Validator {
	createRules(service: any) {
		const t = Object.getPrototypeOf(this)
		const rules = validatorRuleMap.get(t)
		const a = validater.getMetadataStorage().getTargetValidationMetadatas(this.constructor)
		a.forEach(v => {
			rules[v.propertyName] = {
				validator(rule, value) {
					console.log(v)
					const isTrue = v.constraintCls.prototype.validate(value, v)
					if (!isTrue) return new Error(v.message || v.constraintCls.prototype.defaultMessage(v))
					return true
				},
				trigger: ['input'],
			}
		})
		console.log(rules)
		// for (const key in rules) {
		// 	if (typeof rules[key] === 'function') {
		// 		rules[key.replace('f_', '')] = rules[key](service)
		// 	}
		// }
		return rules
	}
}

export function Rule<T extends any>(data: FormItemRule<T>) {
	return (target: any, key: string) => {
		const rule = validatorRuleMap.get(target)
		let ruleKey = key
		if (typeof data === 'function') {
			ruleKey = 'f_' + key
		}
		if (rule) {
			rule[ruleKey] = data
			validatorRuleMap.set(target, rule)
		} else {
			validatorRuleMap.set(target, { [ruleKey]: data })
		}
	}
}
