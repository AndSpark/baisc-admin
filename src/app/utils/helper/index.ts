export function filterObject<T extends Record<string, unknown>>(obj: T) {
	return Object.fromEntries(
		Object.entries(obj).filter(([, value]) => value !== undefined && value !== null)
	)
}

export function isEmptyObject(obj: Record<string, any>) {
	return Object.keys(obj).length === 0
}

export function getObjectValueByKey(obj: Record<string, any>, key: string) {
	return key.split('.').reduce((p, c) => p[c], obj)
}

export function sleep(time: number) {
	return new Promise(res => setTimeout(res, time))
}
