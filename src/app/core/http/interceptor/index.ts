import ErrorInterceptor from './error-interceptor'
import LoggingInterceptor from './logging-interceptor'
import TokenInterceptor from './token-interceptor'

const httpInterceptorProviders = [LoggingInterceptor, ErrorInterceptor, TokenInterceptor]

export default httpInterceptorProviders
