import { MainController, GetStatsController } from '@/application/controllers'
import { GetStats } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'
import { mockStats } from '@/domain/test'
import { ServerError } from '@/application/errors'

describe('GetStatsController', () => {
  let getStats: MockProxy<GetStats>
  let sut: GetStatsController
  let output: GetStats.Output

  beforeAll(() => {
    output = mockStats()

    getStats = mock()
    getStats.get.mockResolvedValue(output)
  })

  beforeEach(() => {
    sut = new GetStatsController(getStats)
  })

  it('should extends Controller', () => {
    expect(sut).toBeInstanceOf(MainController)
  })

  it('should call GetStats correctly', async () => {
    await sut.handle(null)

    expect(getStats.get).toHaveBeenCalled()
    expect(getStats.get).toHaveBeenCalledTimes(1)
  })

  it('should return 500 on infra error', async () => {
    const error = new Error('infra_error')
    getStats.get.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle(null)

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('should return 200 if add succeeds', async () => {
    const httpResponse = await sut.handle(null)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: output
    })
  })
})
