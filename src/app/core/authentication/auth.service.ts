import { getNow } from '@/app/utils/time'
import { Injectable } from 'injection-js'
import { Mut, VueService } from 'vue3-oop'
import { authApi } from 'szpt-driver-api'
import { Token, User, UsernamePasswordLoginForm } from 'szpt-driver-api/auth'
import { Subject } from 'rxjs'
import { LocalStorageService } from '../storage/storage.service'
@Injectable()
export default class AuthService extends VueService {
	constructor(private storage: LocalStorageService) {
		super()
		this.token = this.storage.get('token')
	}
	@Mut() user: User | null = null
	@Mut() token: Token | null = null

	change$ = new Subject<User | null>()

	get hasLogin() {
		return this.checkTokenExpire()
	}

	get couldRefresh() {
		if (!this.token) return false
		return this.token.refreshToken && this.token.refreshTokenExpire > getNow()
	}

	async login(form: UsernamePasswordLoginForm) {
		const res = await authApi.login.login(form)
		this.setToken(res.token)
		await this.getMe()
		this.change$.next(this.user)
	}

	async logout() {
		await authApi.logout.logout()
		this.clear()
	}

	async refresh() {
		const res = await authApi.token.refresh({ refresh: this.token!.refreshToken })
		this.setToken(res)
	}

	async getMe() {
		this.user = await authApi.me.getMe()
	}

	private setToken(token: Token) {
		this.token = token
		this.token.refreshTokenExpire = getNow() + token.refreshTokenExpire
		this.token.tokenExpire = getNow() + token.tokenExpire
		this.storage.set('token', this.token)
	}

	private checkTokenExpire() {
		if (!this.token) return false
		if (getNow() > this.token.tokenExpire) {
			return false
		}
		return true
	}

	private clear() {
		this.user = null
		this.token = null
		this.change$.next(this.user)
		this.storage.remove('token')
	}
}