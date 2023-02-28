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
		if (!route.meta || route.meta?.hide || !route.meta?.title) return
		const { name, path, meta, component } = route
		let routeChildren: RouteMenu[] = []
		if (route.children) {
			routeChildren = transformRoutesToMenu(route.children)
		}

		const MenuItem: RouteMenu = {
			key: name as string,
			label: component
				? () => h(RouterLink, { to: { name: route.name } }, { default: () => meta!.title! })
				: meta.title!,
			routeName: name as string,
			routePath: path,
			icon: meta?.icon ? () => h('i', { class: 'iconfont ' + meta.icon }) : undefined,
		}
		if (routeChildren.length) MenuItem.children = routeChildren
		Menu.push(MenuItem)
	})
	return Menu
}
