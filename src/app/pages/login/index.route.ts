import AuthService from '@/app/core/authentication/auth.service'
import { nMessage } from '@/app/utils/naive'
import { Injectable } from 'injection-js'
import type { RouteRecord } from 'vue-router'
import { injectService } from 'vue3-oop'

@Injectable()
export default class LoginRoute implements Partial<RouteRecord> {
	path = '/login'
	component = () => import('./index.page')

	authService = injectService(AuthService)!

	beforeEnter: RouteRecord['beforeEnter'] = (to, from, next) => {
		if (this.authService.hasLogin) {
			return next('/')
		}
		next()
	}
}
