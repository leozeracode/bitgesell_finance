import { ItemRepository } from '@/domain/repos'
import { GetItemsService } from './get-items'

import { mock, MockProxy } from 'jest-mock-extended'
import { GetItems } from '@/domain/usecases'
import { mockItem } from '@/domain/test'
import { faker } from '@faker-js/faker/.'

describe('GetItemsService', () => {
  let sut: GetItemsService
  let itemRepository: MockProxy<ItemRepository>
  let output: GetItems.Output
  let input: GetItems.Input

  beforeAll(() => {
    input = { query: faker.string.alpha(10), limit: faker.number.int({ min: 1, max: 100 }) }
    output = {
      items: [mockItem(), mockItem(), mockItem()],
      total: 3,
      page: 1,
      limit: input.limit ?? 0
    }
    itemRepository = mock()
    itemRepository.getByFilter.mockResolvedValue(output)
  })

  beforeEach(() => {
    sut = new GetItemsService(itemRepository)
  })

  it('should call ItemRepository with correct input', async () => {
    await sut.get(input)

    expect(itemRepository.getByFilter).toHaveBeenCalledWith({ query: input.query, limit: input.limit })
    expect(itemRepository.getByFilter).toHaveBeenCalledTimes(1)
  })

  it('should throw if ItemRepository throws', async () => {
    itemRepository.getByFilter.mockRejectedValueOnce(new Error('load_error'))

    const promise = sut.get(input)
    await expect(promise).rejects.toThrow(new Error('load_error'))
  })

  it('should return an item on success', async () => {
    const result = await sut.get(input)
    expect(result).toEqual(output)
  })
})
