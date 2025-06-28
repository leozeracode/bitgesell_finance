import { GetItems } from '@/domain/usecases'
import { ItemRepository } from '@/domain/repos'

export class GetItemsService implements GetItems {
  constructor (private readonly repo: ItemRepository) { }
  async get (input: GetItems.Input): Promise<GetItems.Output> {
    return await this.repo.getByFilter(input)
  }
}
