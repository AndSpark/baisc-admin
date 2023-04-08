import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Injectable } from 'injection-js'
import AbstractInterceptor, { AxiosRequest } from './abstract-interceptor'

@Injectable()
export default class ErrorInterceptor implements AbstractInterceptor {
	interceptor(request: AxiosRequestConfig<any>, next: AxiosRequest) {
		next(request).catch(err => {
			console.log(err)
		})
	}
}
