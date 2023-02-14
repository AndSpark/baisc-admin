import { FormProps, NForm } from 'naive-ui'
import { Computed, Link, Mut, VueService } from 'vue3-oop'
import { h } from 'vue'
import Validator from './validator'
import type { FormInst } from 'naive-ui/es/form/src/interface'

export abstract class FormService<T extends Validator> extends VueService {
	@Link() nForm!: FormInst
	@Mut() abstract form: T
	nFormProps: FormProps = {}

	@Computed()
	get rules() {
		return this.form.createRules()
	}

	validate() {
		return this.nForm.validate()
	}

	restoreValidation() {
		this.nForm.restoreValidation()
	}

	NForm = (a: any) => {
		return h(
			NForm,
			Object.assign(
				{
					ref: 'nForm',
					model: this.form,
					rules: this.rules,
				},
				this.nFormProps
			),
			() => a
		)
	}
}
