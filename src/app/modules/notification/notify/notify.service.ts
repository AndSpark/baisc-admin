import AuthService from '@/app/core/authentication/auth.service'
import { FormService } from '@/app/core/form'
import { Injectable } from 'injection-js'
import { injectService, Mut } from 'vue3-oop'
import { Loading } from '@/app/utils/decorators/common/Loading'
import { ErrorDialog } from '@/app/utils/decorators/common/ErrorDialog'
import NotifyForm from './notify.form'
import { FormItemOption } from '@/app/core/form/type'
import { NButton, NInput } from 'naive-ui'
import { computed, shallowRef } from 'vue'

@Injectable()
export default class NotifyService extends FormService<NotifyForm> {
	@Mut() form = new NotifyForm()
	@Mut() defaultForm: FormItemOption[] = [
		{
			label: '标题',
			path: 'title',
			component: shallowRef(NInput),
			componentProps: {
				value: computed(() => this.form.title),
				onInput: (e: string) => (this.form.title = e),
			},
		},
		{
			component: shallowRef(NButton),
			componentProps: {
				onClick: () => this.notify(),
			},
			componentSlot: () => '提交',
		},
	]

	notify() {
		console.log(this.form)
	}
}
