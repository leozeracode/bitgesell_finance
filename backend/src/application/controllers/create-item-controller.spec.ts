import { MainController, CreateItemController } from '@/application/controllers'
import { CreateItem } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'
import { mockItem, mockItemWithoutId } from '@/domain/test'
import { ServerError } from '@/application/errors'

describe('CreateItemController', () => {
  let createItem: MockProxy<CreateItem>
  let sut: CreateItemController
  let item: CreateItem.Output
  let params: CreateItem.Input

  beforeAll(() => {
    params = mockItemWithoutId()
    item = mockItem()

    createItem = mock()
    createItem.create.mockResolvedValue(item)
  })

  beforeEach(() => {
    sut = new CreateItemController(createItem)
  })

  it('should extends Controller', () => {
    expect(sut).toBeInstanceOf(MainController)
  })

  it('should call CreateItem with correct input', async () => {
    await sut.handle(params)

    expect(createItem.create).toHaveBeenCalledWith(params)
    expect(createItem.create).toHaveBeenCalledTimes(1)
  })

  it('should return 500 on infra error', async () => {
    const error = new Error('infra_error')
    createItem.create.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle(params)

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('should return 200 if create succeeds', async () => {
    const httpResponse = await sut.handle(params)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: item
    })
  })
})
