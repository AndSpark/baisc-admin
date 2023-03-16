import ThemeService from '@/app/core/theme/theme.service'
import AMapService from '@/app/modules/amap/amap.service'
import { watch } from 'vue'
import { Component, Hook, injectService, VueComponent } from 'vue3-oop'
import { MapStyles } from './help'

@Component()
export default class AMapView extends VueComponent {
	themeService = injectService(ThemeService)!
	aMapService = injectService(AMapService)!

	map?: AMap.Map
	mapOptions: Partial<AMap.MapOptions> = {
		mapStyle: MapStyles.NORMAL,
	}

	init() {
		watch(
			() => this.themeService.theme.darkMode,
			isDark => {
				this.mapOptions.mapStyle = isDark ? MapStyles.DARK : MapStyles.NORMAL
				this.map?.setMapStyle(this.mapOptions.mapStyle)
			},
			{
				immediate: true,
			}
		)
	}

	@Hook('Mounted')
	async createAMap() {
		await AMapService.loadAMap()
		const amapDiv = document.getElementById('amap-view') as HTMLDivElement
		this.map = new AMapService.AMap.Map(amapDiv, this.mapOptions)
	}

	render() {
		return <div id='amap-view' class='w-full h-full'></div>
	}
}
