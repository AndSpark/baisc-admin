import Validator, { Rule } from '@/app/core/form/validator'
import { IsDefined, MinLength } from 'class-validator'

export default class NotifyForm extends Validator {
	@Rule({ required: true })
	title: string = ''

	@MinLength(6)
	content: string = ''
}
