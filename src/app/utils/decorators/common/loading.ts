import { createMethodDecorator } from '../help'

export function Loading(key: string = 'loading') {
	return createMethodDecorator(async (fn: () => any, target: any) => {
		eval(`target.${key} = true`)
		try {
			const res = await fn()
			eval(`target.${key} = false`)
			return res
		} catch (error) {
			eval(`target.${key} = false`)
			return Promise.reject(error)
		}
	})
}
