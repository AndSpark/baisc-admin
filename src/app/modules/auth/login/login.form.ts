import { Trigger } from '@/app/core/form/decorators/trigger'
import Validator from '@/app/core/form/validator'
import { IsNumber, IsString, Length, MinLength } from 'class-validator'
import LoginSerivce from './login.service'

@Trigger(['input', 'blur'])
export default class LoginForm extends Validator {
	@IsNumber()
	username?: string = ''

	@Length(2, 4)
	password?: string = '234455'
}
