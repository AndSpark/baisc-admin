import AuthService from '@/app/core/authentication/auth.service'
import { VueService, injectService } from 'vue3-oop'
import { LocalMut } from '../decorators/vue3-oop/localMut'

export default class TransformService extends VueService {
	authService = injectService(AuthService)!

	static toUser(username: string) {}

	@LocalMut() userMap = {}

	toUser() {}
}
