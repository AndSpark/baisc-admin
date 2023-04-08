import Validator from '@/app/core/form/validator'
import { IsDefined, MinLength } from 'class-validator'

export default class NotifyForm extends Validator {
	@MinLength(2, { message: '标题过短' })
	title: string = '123'

	@MinLength(6, { message: '内容太少了' })
	content: string = ''

	withVioce = false
}
