import Validator from '@/app/core/form/validator'
import { Rule } from '@/app/core/form/validator'
import { IsNumber, IsString, Length, MinLength } from 'class-validator'
import LoginSerivce from './login.service'

export default class LoginForm extends Validator {
	@Rule((service: LoginSerivce) => {
		let required = true
		return {
			required,
			min: 6,
			validator(rule, value) {
				console.log(1111)
				return true
			},
			trigger: ['input'],
		}
	})
	@IsNumber()
	username?: string = ''

	@Rule({
		required: true,
		min: 6,
	})
	@Length(2, 4, { message: '长度应该在2到4之间' })
	password?: string = '234455'
}
