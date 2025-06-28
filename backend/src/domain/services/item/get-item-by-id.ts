import { GetItemById } from '@/domain/usecases'
import { ItemRepository } from '@/domain/repos'

export class GetItemByIdService implements GetItemById {
  constructor (private readonly repo: ItemRepository) {}
  async getById (input: GetItemById.Input): Promise<GetItemById.Output> {
    return await this.repo.getById(input)
  }
}
