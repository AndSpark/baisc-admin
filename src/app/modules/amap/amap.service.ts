import { VueService } from 'vue3-oop'
import '@amap/amap-jsapi-types'
import AMapLoader from '@amap/amap-jsapi-loader'
import APP_CONFIGS from '@/config'

export default class AMapService extends VueService {
	static AMAP_KEY: string = APP_CONFIGS.AMAP_KEY
	static AMAP_VERSION: string = '2.0'
	static AMap: typeof AMap

	currentMapInstance?: AMap.Map
	tileLayer?: typeof AMap.TileLayer.Traffic

	constructor() {
		super()
		AMapService.loadAMap()
	}

	static async loadAMap(): Promise<void> {
		if (!AMapService.AMap) {
			AMapService.AMap = await AMapLoader.load({
				key: AMapService.AMAP_KEY,
				version: AMapService.AMAP_VERSION,
			})
		}
	}

	static setTraffic(map?: AMap.Map): void {
		if (!map || !AMapService.AMap) throw new Error('Invalid parameters')
		const tileLayer = new AMapService.AMap.TileLayer.Traffic()
		tileLayer.setMap(map)
	}
}
