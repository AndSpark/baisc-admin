import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Injectable } from 'injection-js'
import { injectService } from 'vue3-oop'
import AuthService from '../../authentication/auth.service'
import { RouterService } from '../../router/router.service'
import { LocalStorageService } from '../../storage/storage.service'
import AbstractInterceptor, { AxiosRequest } from './abstract-interceptor'

let refreshRequest: null | Promise<any> = null

@Injectable()
export default class TokenInterceptor implements AbstractInterceptor {
	authService = injectService(AuthService)!
	routerService = injectService(RouterService)!

	async interceptor(request: AxiosRequestConfig<any>, next: AxiosRequest) {
		request.headers = Object.assign(
			{ Authorization: this.authService.token?.token },
			request.headers || {}
		)

		if (
			!this.authService.hasLogin &&
			!request.headers?.['isRefresh'] &&
			this.routerService.currentRoute.path !== '/login'
		) {
			if (this.authService.couldRefresh) {
				refreshRequest ||= this.authService.refresh()
				await refreshRequest
				next(request)
			} else {
				this.routerService.router.push('/login')
				return Promise.reject('登陆信息已过期，请重新登陆')
			}
		} else {
			next(request)
		}
	}
}
