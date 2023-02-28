import { VueComponent } from 'vue3-oop'
import BasicLogo from '../basic-logo'
import HeaderMenu from './components/headerMenu'

export default class BasicHearder extends VueComponent {
	render() {
		return (
			<div class='flex-y-center h-full'>
				<BasicLogo></BasicLogo>
				<HeaderMenu></HeaderMenu>
			</div>
		)
	}
}
