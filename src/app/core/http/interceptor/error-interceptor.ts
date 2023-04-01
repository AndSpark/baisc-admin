import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Injectable } from 'injection-js'
import AbstractInterceptor, { AxiosRequest } from './abstract-interceptor'

@Injectable()
export default class ErrorInterceptor implements AbstractInterceptor {
	interceptor(request: AxiosRequestConfig<any>, next: AxiosRequest) {
		next(request).catch(([err, setError]: [AxiosError, (e: any) => any]) => {
			if (err.response?.data) setError(err.response.data)
		})
	}
}
