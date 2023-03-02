import DarkModeContainer from '@/app/components/common/darkModeContainer'
import { VueComponent } from 'vue3-oop'
import BasicLogo from '../basic-logo'
import HeaderMenu from './components/headerMenu'

export default class BasicHearder extends VueComponent {
	render() {
		return (
			<DarkModeContainer class='flex-y-center h-full shadow'>
				<BasicLogo></BasicLogo>
				<HeaderMenu></HeaderMenu>
			</DarkModeContainer>
		)
	}
}
