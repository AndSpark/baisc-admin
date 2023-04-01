import Validator from '@/app/core/form/validator'
import { IsDefined, MinLength } from 'class-validator'

export default class NotifyForm extends Validator {
	title: string = ''

	@MinLength(6)
	content: string = ''
}
