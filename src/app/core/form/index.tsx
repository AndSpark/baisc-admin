import { FormProps, NForm, NSpin } from 'naive-ui'
import { Computed, Link, Mut, VueService } from 'vue3-oop'
import { h, watch } from 'vue'
import Validator from './validator'
import type { FormInst } from 'naive-ui/es/form/src/interface'
import { Loading } from '@/app/utils/decorators/common/Loading'
import { isArray } from 'class-validator'

export abstract class FormService<T extends Validator> extends VueService {
	@Link() nForm!: FormInst
	@Mut() abstract form: T
	@Mut() loading = false
	nFormProps: FormProps = {}

	@Computed()
	private get innerRules() {
		return this.form?.createRules()
	}

	async validate() {
		return await this.nForm.validate()
	}

	restoreValidation() {
		this.nForm.restoreValidation()
	}

	NForm(el: JSX.Element) {
		return (
			<NSpin show={this.loading}>
				<NForm ref='nForm' model={this.form} rules={this.innerRules} {...this.nFormProps}>
					{el}
				</NForm>
			</NSpin>
		)
	}
}
