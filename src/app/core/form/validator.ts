const validatorRuleMap = new Map()
import Schema, { RuleItem } from 'async-validator'

export default abstract class Validator {
	createRules() {
		const t = Object.getPrototypeOf(this)
		return validatorRuleMap.get(t)
	}
}

export function Rule(data: RuleItem) {
	return (target: any, key: string) => {
		const rule = validatorRuleMap.get(target)
		if (rule) {
			rule[key] = data
			validatorRuleMap.set(target, rule)
		} else {
			validatorRuleMap.set(target, { [key]: data })
		}
	}
}
