import { getNow } from '@/app/utils/time'
import { Injectable } from 'injection-js'
import { Mut, VueService } from 'vue3-oop'
import { authApi } from 'szpt-driver-api'
import { Token, User, UsernamePasswordLoginForm } from 'szpt-driver-api/auth'
import { Subject } from 'rxjs'
import { localGet, localRemove, localSet } from '@/app/utils/local-storage'
@Injectable()
export default class AuthService extends VueService {
	@Mut() user: User | null = null
	@Mut() token: Token | null = localGet('token')

	change$ = new Subject<User | null>()

	constructor() {
		super()
		if (!this.checkTokenExpire()) this.clear()
	}

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
		this.token.refreshTokenExpire = getNow() + token.refreshTokenExpire * 1000
		this.token.tokenExpire = getNow() + token.tokenExpire * 1000
		localSet('token', this.token)
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
		localRemove('token')
	}
}
