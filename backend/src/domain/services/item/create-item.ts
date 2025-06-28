import { ItemRepository } from '@/domain/repos'
import { CreateItem } from '@/domain/usecases'

export class CreateItemService implements CreateItem {
  constructor (private readonly repo: ItemRepository) {}
  async create (input: CreateItem.Input): Promise<CreateItem.Output> {
    const item = await this.repo.save(input)
    return item
  }
}
