import { GetStats } from '@/domain/usecases'
import { ItemRepository } from '@/domain/repos'

export class GetStatsService implements GetStats {
  constructor (private readonly repo: ItemRepository) { }
  async get (): Promise<GetStats.Output> {
    return await this.repo.getStats()
  }
}
