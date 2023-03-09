export type Topic = 'bpmn' | 'evidence'

export type TopicHandlers = {
	[x in Topic]?: ((response: TopicResponses[x]) => any)[]
}

export type TopicHandler<T extends Topic> = (response: TopicResponse<T>) => any

export type TopicResponse<T extends Topic> = TopicResponses[T]

export type TopicResponses = {
	bpmn: BpmnTopicResponse
	evidence: any
}

export type BpmnTopicResponse = {
	action: string
	data: any
}
