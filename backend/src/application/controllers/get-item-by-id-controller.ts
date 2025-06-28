import { GetItemById } from '@/domain/usecases'
import { MainController } from '@/application/controllers'
import { HttpResponse, notFound, ok } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

type HttpRequest = GetItemById.Input

export class GetItemByIdController extends MainController {
  constructor (
    private readonly getItemById: GetItemById
  ) {
    super()
  }

  async perform (request: HttpRequest): Promise<HttpResponse<any>> {
    const item = await this.getItemById.getById(request)
    if (!item) {
      return notFound()
    }
    return ok(item)
  }

  override buildValidators ({ id }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: id, fieldName: 'id' }).required().build()
    ]
  }
}
