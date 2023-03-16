import AuthService from '@/app/core/authentication/auth.service'
import { FormService } from '@/app/core/form'
import LoginForm from './login.form'
import { Injectable } from 'injection-js'
import { injectService, Mut } from 'vue3-oop'

@Injectable()
export default class LoginSerivce extends FormService<LoginForm> {
	private authService = injectService(AuthService)!

	@Mut() form = new LoginForm()

	async login() {
		await this.validate()
		this.authService.login(this.form)
	}
}
