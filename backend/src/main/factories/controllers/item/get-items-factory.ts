import { GetItemsController } from '@/application/controllers'
import { Controller } from '@/application/protocols'
import { ItemRepository } from '@/domain/repos'
import { GetItemsService } from '@/domain/services/item'
import { GetItems } from '@/domain/usecases'
import { ItemJsonRepository } from '@/infra/db'

const makeItemJsonRepository = (): ItemRepository => new ItemJsonRepository()
const makeGetItemsService = (): GetItems => new GetItemsService(makeItemJsonRepository())

export const makeGetItemsController = (): Controller => {
  return new GetItemsController(makeGetItemsService())
}
