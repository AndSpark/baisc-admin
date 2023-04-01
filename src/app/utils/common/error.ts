import { isArray, isObject, isString } from 'class-validator'

export function toErrorMessage(error: unknown): string {
	if (isString(error)) return error
	if (isObject<Record<string, any>>(error)) {
		if (error.message) return error.message
		if (error.error) return error.error
		if (error.msg) return error.msg
		try {
			return JSON.stringify(error)
		} catch (err) {
			console.warn(error)
			return '未知错误'
		}
	}
	if (isArray<unknown>(error)) {
		return error.map(v => toErrorMessage(v)).join(' ; ')
	}
	console.warn(error)
	return '未知错误'
}
