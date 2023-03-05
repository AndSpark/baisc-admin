import DarkModeContainer from '@/app/components/common/darkModeContainer'
import { VueComponent } from 'vue3-oop'
import BasicLogo from '../basic-logo'
import ThemeMode from './components/themeMode'
import Fullscreen from './components/fullScreen'
import HeaderMenu from './components/headerMenu'

export default class BasicHearder extends VueComponent {
	render() {
		return (
			<DarkModeContainer class='flex-y-center h-full shadow'>
				<BasicLogo></BasicLogo>
				<HeaderMenu></HeaderMenu>
				<div class='flex-1'></div>
				<Fullscreen />
				<ThemeMode />
			</DarkModeContainer>
		)
	}
}
