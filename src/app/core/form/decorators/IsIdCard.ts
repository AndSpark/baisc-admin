import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'
import { isIdCard } from '../validators/isIdCard'

export function IsIdCard(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: isIdCard.name,
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					return isIdCard(value)
				},
				defaultMessage() {
					return '请输入正确的身份证号码'
				},
			},
		})
	}
}
