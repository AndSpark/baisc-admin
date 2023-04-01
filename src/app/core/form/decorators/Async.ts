import { sleep } from '@/app/utils/helper'
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

export function Async(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'async',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				async validate(value: any, args: ValidationArguments) {
					await sleep(300)
					return Math.random() >= 0.5
				},
				defaultMessage() {
					return '异步'
				},
			},
		})
	}
}
