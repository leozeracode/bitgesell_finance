import { GetStats } from '@/domain/usecases'
import { MainController } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'

export class GetStatsController extends MainController {
  constructor (
    private readonly getStats: GetStats
  ) {
    super()
  }

  async perform (): Promise<HttpResponse<any>> {
    const items = await this.getStats.get()
    return ok(items)
  }
}
