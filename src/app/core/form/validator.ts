const validatorRuleMap = new Map()
import { FormItemRule as Rule2 } from 'naive-ui'

type FormItemRule<T> = ((service: T) => Rule2) | Rule2

export default abstract class Validator {
	createRules(service: any) {
		const t = Object.getPrototypeOf(this)
		const rules = validatorRuleMap.get(t)
		for (const key in rules) {
			if (typeof rules[key] === 'function') {
				rules[key.replace('f_', '')] = rules[key](service)
			}
		}
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
