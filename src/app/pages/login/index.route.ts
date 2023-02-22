import AuthService from '@/app/core/authentication/auth.service'
import AbstractRoute from '@/app/core/router/abstract-route'
import { Injectable } from 'injection-js'
import type { RouteRecord } from 'vue-router'
import { injectService } from 'vue3-oop'

@Injectable()
export default class LoginRoute extends AbstractRoute {
	path = '/login'
	component = () => import('./index.page')
	authService = injectService(AuthService)!

	layout: 'basic' | 'blank' = 'blank'

	beforeEnter: RouteRecord['beforeEnter'] = (to, from, next) => {
		if (this.authService.hasLogin) {
			return next('/')
		}
		next()
	}
}
