import HoverContainer from '@/app/components/common/hoverContainer'
import SvgIcon from '@/app/components/common/svgIcon'
import AuthService from '@/app/core/authentication/auth.service'
import { NDropdown } from 'naive-ui'
import { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
import { Component, injectService, Mut, VueComponent } from 'vue3-oop'

@Component()
export default class UserAvatar extends VueComponent {
	authService = injectService(AuthService)!

	@Mut() options: DropdownMixedOption[] = [
		{
			label: '用户中心',
			key: 'profile',
			icon: () => <SvgIcon icon={'avatar'}></SvgIcon>,
		},
		{
			label: '退出登陆',
			key: 'logout',
			icon: () => <SvgIcon icon={'logout'}></SvgIcon>,
		},
	]

	handleOptionSelect(key: string) {
		if (key === 'logout') this.authService.logout()
	}

	render() {
		return (
			<NDropdown options={this.options} onSelect={e => this.handleOptionSelect(e)}>
				<HoverContainer contentClass='h-full flex gap-2'>
					{/* <div class='border-2 rounded-full w-7 h-7 flex-center   '>
						{this.authService.user?.profile.realName.slice(0, 1)}
					</div> */}
					<span class='truncate'>{this.authService.user?.profile.realName}</span>
				</HoverContainer>
			</NDropdown>
		)
	}
}
