export function filterObject<T extends Record<string, unknown>>(obj: T) {
	return Object.fromEntries(
		Object.entries(obj).filter(([, value]) => value !== undefined && value !== null)
	)
}

export function isEmptyObject(obj: Record<string, any>) {
	return Object.keys(obj).length === 0
}
