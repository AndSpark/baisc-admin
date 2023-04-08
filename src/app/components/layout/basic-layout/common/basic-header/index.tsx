import DarkModeContainer from '@/app/components/common/darkModeContainer'
import { VueComponent, injectService } from 'vue3-oop'
import BasicLogo from '../basic-logo'
import ThemeMode from './components/themeMode'
import Fullscreen from './components/fullscreen'
import HeaderMenu from './components/headerMenu'
import Notification from './components/notification'
import UserAvatar from './components/userAvatar'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

export default class BasicHearder extends VueComponent {
	isMobile = useBreakpoints(breakpointsTailwind).smaller('sm')

	render() {
		const isMobile = this.isMobile.value
		return (
			<DarkModeContainer class='flex-y-center h-full shadow'>
				{!isMobile && <BasicLogo></BasicLogo>}
				<HeaderMenu></HeaderMenu>
				<div class='flex-1'></div>
				{!isMobile && <Fullscreen />}
				<ThemeMode />
				<Notification></Notification>
				{!isMobile && <UserAvatar></UserAvatar>}
			</DarkModeContainer>
		)
	}
}
