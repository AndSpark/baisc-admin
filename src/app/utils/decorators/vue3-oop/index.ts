import { VueComponent, VueService } from 'vue3-oop'
import { LocalMutHandler } from './localMut'
import { WsSubscribeHandler } from 'szjw-ws'

VueComponent.handler = [...VueComponent.handler, LocalMutHandler, WsSubscribeHandler]
VueService.handler = [...VueComponent.handler, LocalMutHandler, WsSubscribeHandler]
