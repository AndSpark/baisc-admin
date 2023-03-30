export interface MetadataStore<T extends any[]> {
	key: string
	options: T[]
	desc?: PropertyDescriptor | null
}

interface PropsDecorator<T extends any[]> {
	(...agrs: T): any
	MetadataKey: symbol
}

export function createDecorator<T extends any[]>(
	name: string,
	allowRepeat = false
): PropsDecorator<T> {
	const MetadataKey = Symbol(name)
	const decoratorMethod = function (...options: T) {
		return function (target: any, key?: string | symbol) {
			let t = target.validationMetas ? target.constructor : target
			const list: MetadataStore<T>[] = Reflect.getMetadata(MetadataKey, t) || []
			const hasExist = list.find(v => v.key === key)
			if (!hasExist || key === undefined) {
				list.push({
					key: key as string,
					options: [options],
				})
			} else {
				if (!allowRepeat) hasExist.options = [options]
				else hasExist.options.push(options)
			}
			Reflect.defineMetadata(MetadataKey, [...list], t)
		}
	}
	decoratorMethod.MetadataKey = MetadataKey
	return decoratorMethod
}

export function getProtoMetadata<T extends any[]>(
	target: any,
	metadataKey: symbol,
	withDesc = false
) {
	let proto: any
	if (typeof target === 'function') {
		proto = target.prototype
	} else {
		proto = Object.getPrototypeOf(target).constructor
	}
	const metadataStores: MetadataStore<T>[] = Reflect.getMetadata(metadataKey, proto) || []
	if (withDesc) {
		metadataStores.forEach(v => (v.desc = getDeepOwnDescriptor(proto, v.key)))
	}
	return metadataStores
}

export function getDeepOwnDescriptor(proto: any, key: string | symbol): PropertyDescriptor | null {
	if (!proto) return null
	const desc = Object.getOwnPropertyDescriptor(proto, key)
	if (desc) return desc
	return getDeepOwnDescriptor(Object.getPrototypeOf(proto), key)
}

export function handleDecorator<T extends any[]>(
	targetThis: any,
	metadataKey: symbol,
	handler: (store: MetadataStore<T>) => any,
	withDesc = false
) {
	const list = getProtoMetadata<T>(targetThis, metadataKey, withDesc) || []
	for (const store of list) {
		handler(store)
	}
}
