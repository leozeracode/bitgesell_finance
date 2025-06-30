import { CreateItemController } from '@/application/controllers'
import { Controller } from '@/application/protocols'
import { ItemRepository } from '@/domain/repos'
import { CreateItemService } from '@/domain/services/item'
import { CreateItem } from '@/domain/usecases'
import { ItemJsonRepository } from '@/infra/db'

const makeItemJsonRepository = (): ItemRepository => new ItemJsonRepository()
const makeCreateItemService = (): CreateItem => new CreateItemService(makeItemJsonRepository())

export const makeCreateItemController = (): Controller => {
  return new CreateItemController(makeCreateItemService())
}
