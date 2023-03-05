import { VueComponent, VueService } from 'vue3-oop'
import { LocalMutHandler } from './localMut'

VueComponent.handler = [...VueComponent.handler, LocalMutHandler]
VueService.handler = [...VueComponent.handler, LocalMutHandler]
