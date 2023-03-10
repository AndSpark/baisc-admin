import { localGet, localSet } from '@/app/utils/local-storage'
import { onBeforeMount, ref, watch } from 'vue'
import { createDecorator, getProtoMetadata, Hanlder } from 'vue3-oop'

export const LocalMut: LocalMutDecorator = createDecorator('LocalMut')
export interface LocalMutDecorator {
	(expire?: number): PropertyDecorator
	MetadataKey: symbol | string
}
function handler(targetThis: Record<any, any>) {
	const list = getProtoMetadata<number | undefined>(targetThis, LocalMut.MetadataKey)
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

		onBeforeMount(() => {
			targetThis[key as string] = localGet(localKey) || targetThis[key as string]
		})

		watch(
			keyVal,
			val => {
				localSet(localKey, val, options || 0)
			},
			{ deep: true }
		)
	}
}

export const LocalMutHandler: Hanlder = {
	key: 'LocalMut',
	handler,
}
