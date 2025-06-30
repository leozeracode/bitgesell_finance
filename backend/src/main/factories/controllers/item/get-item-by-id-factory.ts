import { GetItemByIdController } from '@/application/controllers'
import { Controller } from '@/application/protocols'
import { ItemRepository } from '@/domain/repos'
import { GetItemByIdService } from '@/domain/services/item'
import { GetItemById } from '@/domain/usecases'
import { ItemJsonRepository } from '@/infra/db'

const makeItemJsonRepository = (): ItemRepository => new ItemJsonRepository()
const makeGetItemByIdService = (): GetItemById => new GetItemByIdService(makeItemJsonRepository())

export const makeGetItemByIdController = (): Controller => {
  return new GetItemByIdController(makeGetItemByIdService())
}
