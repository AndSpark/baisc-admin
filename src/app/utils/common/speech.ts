let looper: number | undefined = undefined

export function speech(text: string, loop: number = 0) {
	const synth = window.speechSynthesis
	const utterThis = new SpeechSynthesisUtterance(text)
	utterThis.rate = 0.9
	synth.speak(utterThis)
	if (loop) {
		if (looper) {
			clearInterval(looper)
			looper = undefined
		}
		looper = setInterval(() => {
			synth.speak(utterThis)
		}, loop * 1000)
	}
	return () => clearInterval(looper)
}
