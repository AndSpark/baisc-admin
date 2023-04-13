import { authApi } from 'szpt-driver-api'
import { UserSimpleEx } from 'szpt-driver-api/auth'
import { ref } from 'vue'

type ApiParams = (args?: any) => Promise<any>

const dataStore = new Map<ApiParams, Record<string, any>>()

export function toAsyncData<T extends ApiParams>(api: T, key: string, ...args: any[]) {
	let apiStore = dataStore.get(api)
	if (!apiStore) {
		apiStore = {}
		dataStore.set(api, apiStore)
	}
	const target = apiStore[key]
	if (target) {
		return target.value
	}
	apiStore[key] = ref(key)
	api(key).then(res => {
		apiStore![key].value = args.reduce((p, c) => p[c], res)
	})
	dataStore.set(api, apiStore)
	return apiStore[key].value
}

export function toUser(username: string, key: keyof UserSimpleEx = 'realName') {
	return toAsyncData(authApi.user.findByUsernameSimpleByUsername, username, key)
}
