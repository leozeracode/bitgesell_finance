import { GetItems } from '@/domain/usecases'
import { MainController } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'

type HttpRequest = GetItems.Input

export class GetItemsController extends MainController {
  constructor (
    private readonly getItems: GetItems
  ) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    const items = await this.getItems.get(httpRequest)
    return ok(items)
  }
}
