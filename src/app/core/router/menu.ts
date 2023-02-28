import { MenuOption } from 'naive-ui'
import { h, VNodeChild } from 'vue'
import { RouteRecordRaw, RouterLink } from 'vue-router'

export type RouteMenu = MenuOption & {
	key: string
	label: string | (() => VNodeChild)
	routeName: string
	routePath: string
	icon?: () => VNodeChild
	children?: RouteMenu[]
}

export function transformRoutesToMenu(routes: readonly RouteRecordRaw[]) {
	const Menu: RouteMenu[] = []
	routes.forEach(route => {
		if (route.meta?.hide) return
		const { name, path, meta } = route
		let routeChildren: RouteMenu[] = []
		if (route.children) {
			routeChildren = transformRoutesToMenu(route.children)
		}
		const MenuItem: RouteMenu = {
			key: name as string,
			label: () => h(RouterLink, { to: { name: route.name } }, { default: () => meta!.title! }),
			routeName: name as string,
			routePath: route.path,
			icon: meta?.icon ? () => h('i', { class: 'iconfont ' + meta.icon }) : undefined,
		}
		if (routeChildren.length) MenuItem.children = routeChildren
		Menu.push(MenuItem)
	})
	return Menu
}
