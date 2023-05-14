import { resolveInstances } from '@/app/utils/injection'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  isAxiosError,
} from 'axios'
import { Injectable } from 'injection-js'
import { setupApi } from 'szpt-driver-api'
import httpInterceptorProviders from './interceptor'
import AbstractInterceptor from './interceptor/abstract-interceptor'

@Injectable()
export class HttpService {
  constructor() {
    //@ts-ignore
    setupApi(this.request.bind(this))
  }

  private instance: AxiosInstance = axios.create({
    baseURL: '/api' || import.meta.env.BASE_URL,
  })
  private httpInterceptors: AbstractInterceptor[] = resolveInstances(httpInterceptorProviders)

  public async request<T = any>(originConfig: AxiosRequestConfig<T>) {
    const resolveList: any[] = []
    const rejectList: any[] = []
    let config = originConfig
    const next = (c: AxiosRequestConfig<T>) =>
      new Promise<AxiosResponse>((resolve, reject) => {
        config = c
        resolveList.push(resolve)
        rejectList.push(reject)
      })
    for (const v of this.httpInterceptors) {
      await v.interceptor(config, next)
    }
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then(async response => {
          let res = response
          try {
            for (const item of resolveList) {
              res = (await item(res)) || res
            }
          } catch (error) {
            console.log(error)
          }
          resolve(res.data)
        })
        .catch(async error => {
          let err = error
          if (isAxiosError(error)) {
            try {
              for (const item of rejectList) {
                await item([err])
              }
            } catch (error) {
              console.log(error)
            }
            reject(error.response?.data || error.message)
          } else {
            reject(err)
          }
        })
    })
  }
}
