import AMapView from '@/app/components/amap'
import { VueComponent } from 'vue3-oop'

export default class MapPage extends VueComponent {
	render() {
		return (
			<div class='h-full w-full'>
				<AMapView></AMapView>
			</div>
		)
	}
}
