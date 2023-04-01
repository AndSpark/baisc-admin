import { NModal } from 'naive-ui'
import { Mut, VueComponent } from 'vue3-oop'

interface ModalArguments {
	title: string | (() => JSX.Element)
	content?: string | (() => JSX.Element)
	footer?: string | (() => JSX.Element)
}

interface ModalValue extends ModalArguments {
	id: number
	show: boolean
}

export default class ModalProvider extends VueComponent {
	@Mut() modalList: ModalValue[] = []

	render() {
		return (
			<>
				{this.modalList.map(v => (
					<NModal show={v.show}></NModal>
				))}
			</>
		)
	}
}
