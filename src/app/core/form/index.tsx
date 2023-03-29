import { FormProps, NForm } from 'naive-ui'
import { Computed, Link, Mut, VueService } from 'vue3-oop'
import { h, watch } from 'vue'
import Validator from './validator'
import type { FormInst } from 'naive-ui/es/form/src/interface'

export abstract class FormService<T extends Validator> extends VueService {
	@Link() nForm!: FormInst
	@Mut() abstract form: T
	nFormProps: FormProps = {}

	constructor() {
		super()
		watch(
			() => this.innerRules,
			val => {
				this.rules = this.innerRules
			},
			{ deep: true }
		)
	}

	@Mut() rules: any = {}

	// NForm的rules不能直接用innerRules，没有效果
	@Computed()
	private get innerRules() {
		return this.form?.createRules(this)
	}

	validate() {
		return this.nForm.validate()
	}

	restoreValidation() {
		this.nForm.restoreValidation()
	}

	NForm(a: any) {
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
