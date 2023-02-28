import AuthService from '@/app/core/authentication/auth.service'
import AbstractRoute from '@/app/core/router/abstract-route'
import { RouterLayout } from '@/global'
import { Injectable } from 'injection-js'
import type { RouteRecord } from 'vue-router'
import { injectService } from 'vue3-oop'

@Injectable()
export default class LoginRoute extends AbstractRoute {
	authService = injectService(AuthService)!

	layout: RouterLayout = 'blank'
	title = '欢迎登陆'
	hide = true

	beforeEnter: RouteRecord['beforeEnter'] = (to, from, next) => {
		if (this.authService.hasLogin) {
			return next('/')
		}

		next()
	}
}
