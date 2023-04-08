import { FormProps, NForm, NFormItem, NSpin } from 'naive-ui'
import { Computed, Link, Mut, VueService } from 'vue3-oop'
import Validator from './validator'
import type { FormInst } from 'naive-ui/es/form/src/interface'
import { FormItemOption } from './type'
import If from '@/app/components/common/if'

export abstract class FormService<T extends Validator> extends VueService {
	@Link() nForm!: FormInst
	@Mut() abstract form: T
	@Mut() loading = false
	@Mut() defaultForm: FormItemOption[] = []
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

	defaultFormEl() {
		return this.defaultForm.map(v => (
			<NFormItem {...v}>
				<v.component {...v.componentProps}>{v.componentSlot?.()}</v.component>
			</NFormItem>
		))
	}

	NForm(el?: JSX.Element) {
		return (
			<NSpin show={this.loading}>
				<NForm ref='nForm' model={this.form} rules={this.innerRules} {...this.nFormProps}>
					{el ? el : this.defaultFormEl()}
				</NForm>
			</NSpin>
		)
	}
}
