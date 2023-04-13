import { Hook, VueComponent } from 'vue3-oop'

export default class MapPage extends VueComponent {
	render() {
		return (
			<div class='h-full w-full'>
				<iframe class='h-full w-full' src='https://hibana.xyz'></iframe>
			</div>
		)
	}
}
