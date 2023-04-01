import { Async } from '@/app/core/form/decorators/Async'
import { IsIdCard } from '@/app/core/form/decorators/IsIdCard'
import { Required } from '@/app/core/form/decorators/Required'
import { Trigger } from '@/app/core/form/decorators/Trigger'
import Validator from '@/app/core/form/validator'
import { Length } from 'class-validator'

@Trigger(['input', 'blur'])
export default class LoginForm extends Validator {
	@Async({ message: '异步校验有一半概率出错' })
	@Required()
	username?: string = ''

	@Length(6, 12, { message: '密码长度应该在6到12间' })
	@Required('请输入密码', o => !!o.username)
	password?: string = ''
}
