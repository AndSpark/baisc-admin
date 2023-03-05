import AbstractRoute from '@/app/core/router/abstract-route'
import { Injectable } from 'injection-js'

@Injectable()
export default class IndexRoute extends AbstractRoute {
	title = '首页'
	icon = 'icon-user'
	index = 0
}
