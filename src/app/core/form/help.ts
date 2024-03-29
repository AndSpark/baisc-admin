import { ValidationArguments } from 'class-validator'

export class ValidationUtils {
	static replaceMessageSpecialTokens(
		message: string | Function,
		validationArguments: ValidationArguments
	) {
		let messageString = ''
		if (message instanceof Function) {
			messageString = message(validationArguments)
		} else if (typeof message === 'string') {
			messageString = message
		}
		if (messageString && Array.isArray(validationArguments.constraints)) {
			validationArguments.constraints.forEach((constraint, index) => {
				messageString = messageString.replace(
					new RegExp(`\\$constraint${index + 1}`, 'g'),
					constraintToString(constraint)
				)
			})
		}
		if (
			messageString &&
			validationArguments.value !== undefined &&
			validationArguments.value !== null &&
			typeof validationArguments.value === 'string'
		)
			messageString = messageString.replace(/\$value/g, validationArguments.value)
		if (messageString)
			messageString = messageString.replace(/\$property/g, validationArguments.property)
		if (messageString)
			messageString = messageString.replace(/\$target/g, validationArguments.targetName)
		return messageString
	}
}

export function constraintToString(constraint: any) {
	if (Array.isArray(constraint)) {
		return constraint.join(', ')
	}
	if (typeof constraint === 'symbol') {
		constraint = constraint.description
	}
	return `${constraint}`
}
