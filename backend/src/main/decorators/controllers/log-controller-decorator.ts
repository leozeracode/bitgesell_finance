import { HttpResponse } from '@/application/helpers'
import { Controller } from '@/application/protocols'
import { logger } from '@/infra/helpers/logger'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller
  ) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)

    if (httpResponse.statusCode === 500) {
      logger.error('An error occurred', httpResponse.data.stack)
      logger.error('Request that caused the error', httpRequest)
    } else {
      logger.info('Request handled', httpRequest)
      logger.info('Response', httpResponse)
    }

    return httpResponse
  }
}
