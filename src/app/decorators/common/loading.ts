import { decoratorMethod } from '../help'

export function Loading(key: string = 'loading') {
	return decoratorMethod(async (fn: () => any, target: any) => {
		eval(`target.${key} = true`)
		try {
			await fn()
			eval(`target.${key} = false`)
		} catch (error) {
			eval(`target.${key} = false`)
			return Promise.reject(error)
		}
	})
}
