import { CreateItem } from '@/domain/usecases'
import { MainController } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

type HttpRequest = CreateItem.Input

export class CreateItemController extends MainController {
  constructor (
    private readonly createItem: CreateItem
  ) {
    super()
  }

  async perform (request: HttpRequest): Promise<HttpResponse<any>> {
    const professional = await this.createItem.create(request)
    return ok(professional)
  }

  override buildValidators ({ category, name, price }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: category, fieldName: 'category' }).required().build(),
      ...Builder.of({ value: name, fieldName: 'name' }).required().build(),
      ...Builder.of({ value: price, fieldName: 'price' }).required().build()
    ]
  }
}
