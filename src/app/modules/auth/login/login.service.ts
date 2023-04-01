import AuthService from '@/app/core/authentication/auth.service'
import { FormService } from '@/app/core/form'
import LoginForm from './login.form'
import { Injectable } from 'injection-js'
import { injectService, Mut } from 'vue3-oop'
import { Loading } from '@/app/utils/decorators/common/Loading'
import { ErrorDialog } from '@/app/utils/decorators/common/ErrorDialog'

@Injectable()
export default class LoginSerivce extends FormService<LoginForm> {
	private authService = injectService(AuthService)!

	@Mut() form = new LoginForm()

	@ErrorDialog({ showRetry: true })
	@Loading()
	async login() {
		await this.validate()
		await this.authService.login(this.form)
	}
}
