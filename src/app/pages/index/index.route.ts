import AbstractRoute from '@/app/core/router/abstract-route'
import { Injectable } from 'injection-js'
import type { RouteRecord } from 'vue-router'

@Injectable()
export default class IndexRoute extends AbstractRoute {
	path = '/'
	component = () => import('./index.page')
	hide = true

	beforeEnter: RouteRecord['beforeEnter'] = (to, from, next) => {
		next()
	}
}
