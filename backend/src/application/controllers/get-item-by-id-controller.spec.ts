import { MainController, GetItemByIdController } from '@/application/controllers'
import { GetItemById } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'
import { mockItem } from '@/domain/test'
import { NotFoundError, ServerError } from '@/application/errors'
import { faker } from '@faker-js/faker'

describe('GetItemByIdController', () => {
  let getItemById: MockProxy<GetItemById>
  let sut: GetItemByIdController
  let item: GetItemById.Output
  let params: GetItemById.Input

  beforeAll(() => {
    params = { id: faker.number.int({ min: 1, max: 1000 }) }
    item = mockItem()

    getItemById = mock()
    getItemById.getById.mockResolvedValue(item)
  })

  beforeEach(() => {
    sut = new GetItemByIdController(getItemById)
  })

  it('should extends Controller', () => {
    expect(sut).toBeInstanceOf(MainController)
  })

  it('should call GetItemById with correct input', async () => {
    await sut.handle(params)

    expect(getItemById.getById).toHaveBeenCalledWith(params)
    expect(getItemById.getById).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if item does not exists', async () => {
    getItemById.getById.mockResolvedValueOnce(null)

    const httpResponse = await sut.handle(params)

    expect(httpResponse).toEqual({
      statusCode: 404,
      data: new NotFoundError()
    })
  })

  it('should return 500 on infra error', async () => {
    const error = new Error('infra_error')
    getItemById.getById.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle(params)

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('should return 200 if add succeeds', async () => {
    const httpResponse = await sut.handle(params)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: item
    })
  })
})
