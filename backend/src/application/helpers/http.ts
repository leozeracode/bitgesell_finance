import { ServerError, NotFoundError } from '@/application/errors'

export type HttpResponse<T = any> = {
  statusCode: number
  data: T | undefined
}

export const ok = <T = any> (data?: T): HttpResponse<T> => ({
  statusCode: 200,
  data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  data: null
})

export const notFound = (): HttpResponse<Error> => ({
  statusCode: 404,
  data: new NotFoundError()
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined)
})
