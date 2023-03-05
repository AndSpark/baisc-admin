import { localGet, localSet } from '@/app/utils/local-storage'
import { ref, watch } from 'vue'
import { createDecorator, getProtoMetadata, Hanlder } from 'vue3-oop'

export const LocalMut: LocalMutDecorator = createDecorator('LocalMut')
export interface LocalMutDecorator {
	(defaultVal?: any): PropertyDecorator
	MetadataKey: symbol | string
}
function handler(targetThis: Record<any, any>) {
	const list = getProtoMetadata<string | undefined>(targetThis, LocalMut.MetadataKey)
	if (!list || !list.length) return
	for (const item of list) {
		const { options, key } = item
		const keyVal = ref()
		const localKey: any = targetThis.constructor.name + '_' + (key as string)
		Object.defineProperty(targetThis, key, {
			enumerable: true,
			configurable: true,
			get() {
				return keyVal.value
			},
			set(v) {
				keyVal.value = v
			},
		})

		watch(
			keyVal,
			val => {
				localSet(localKey, val)
			},
			{ deep: true }
		)

		targetThis[key as string] = localGet(localKey) || options
	}
}

export const LocalMutHandler: Hanlder = {
	key: 'LocalMut',
	handler,
}
