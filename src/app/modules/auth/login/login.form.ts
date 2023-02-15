import Validator from '@/app/core/form/validator'
import { Rule } from '@/app/core/form/validator'
import LoginSerivce from './login.service'

export default class LoginForm extends Validator {
	@Rule((service: LoginSerivce) => {
		let required = true
		return {
			required,
			min: 6,
		}
	})
	username?: string = ''

	@Rule({
		required: true,
		min: 6,
	})
	password?: string = ''
}
