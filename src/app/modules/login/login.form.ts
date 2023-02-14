import Validator from '@/app/core/form/validator'
import { Rule } from '@/app/core/form/validator'

export default class LoginForm extends Validator {
	@Rule({
		required: true,
		min: 6,
	})
	username?: string = ''
	@Rule({
		required: true,
		min: 6,
	})
	password?: string = ''
}
