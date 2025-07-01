import { MainController, GetItemsController } from '@/application/controllers'
import { GetItems } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'
import { mockItems } from '@/domain/test'
import { ServerError } from '@/application/errors'
import { faker } from '@faker-js/faker'

describe('GetItemsController', () => {
  let getItems: MockProxy<GetItems>
  let sut: GetItemsController
  let filter: GetItems.Input
  let output: GetItems.Output

  beforeAll(() => {
    filter = { query: faker.string.alpha(10), limit: 10 }
    output = {
      items: mockItems(3),
      total: 3,
      page: 1,
      limit: filter.limit ?? 0
    }

    getItems = mock()
    getItems.get.mockResolvedValue(output)
  })

  beforeEach(() => {
    sut = new GetItemsController(getItems)
  })

  it('should extends Controller', () => {
    expect(sut).toBeInstanceOf(MainController)
  })

  it('should call GetItems correctly', async () => {
    await sut.handle(filter)

    expect(getItems.get).toHaveBeenCalled()
    expect(getItems.get).toHaveBeenCalledTimes(1)
  })

  it('should return 500 on infra error', async () => {
    const error = new Error('infra_error')
    getItems.get.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle(filter)

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('should return 200 if add succeeds', async () => {
    const httpResponse = await sut.handle(filter)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: output
    })
  })
})
