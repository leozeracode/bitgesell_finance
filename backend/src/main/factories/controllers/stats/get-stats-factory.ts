import { GetStatsController } from '@/application/controllers'
import { Controller } from '@/application/protocols'
import { ItemRepository } from '@/domain/repos'
import { GetStatsService } from '@/domain/services/stats'
import { GetStats } from '@/domain/usecases'
import { ItemJsonRepository } from '@/infra/db'

const makeItemJsonRepository = (): ItemRepository => new ItemJsonRepository()
const makeGetStatsService = (): GetStats => new GetStatsService(makeItemJsonRepository())

export const makeGetStatsController = (): Controller => {
  return new GetStatsController(makeGetStatsService())
}
