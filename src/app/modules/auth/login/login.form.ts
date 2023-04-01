import { Required } from '@/app/core/form/decorators/required'
import { Trigger } from '@/app/core/form/decorators/trigger'
import Validator from '@/app/core/form/validator'
import { IsMobilePhone, IsNumber, IsString, Length, MinLength, ValidateIf } from 'class-validator'
import LoginSerivce from './login.service'

@Trigger(['input', 'blur'])
export default class LoginForm extends Validator {
	@IsNumber()
	username?: string = ''

	@IsMobilePhone('zh-CN', undefined, { message: '应该是手机号' })
	@Length(2, 4, { message: '长度应该在2到4建' })
	@Required('请输入密码', o => !!o.username)
	password?: string = '234455'
}
