import { ItemRepository } from '@/domain/repos'
import { GetItemByIdService } from './get-item-by-id'

import { mock, MockProxy } from 'jest-mock-extended'
import { GetItemById } from '@/domain/usecases'
import { mockItem } from '@/domain/test'
import { faker } from '@faker-js/faker/.'

describe('Name of the group', () => {
  let sut: GetItemByIdService
  let itemRepository: MockProxy<ItemRepository>
  let item: GetItemById.Output
  let input: GetItemById.Input

  beforeAll(() => {
    input = { id: faker.number.int({ min: 1, max: 1000 }) }
    item = mockItem()
    itemRepository = mock()
    sut = new GetItemByIdService(itemRepository)
  })

  beforeEach(() => {
    sut = new GetItemByIdService(itemRepository)
  })

  it('should call ItemRepository with correct id', async () => {
    await sut.getById(input)

    expect(itemRepository.getById).toHaveBeenCalledWith({ id: input.id })
    expect(itemRepository.getById).toHaveBeenCalledTimes(1)
  })

  it('should throw if ItemRepository throws', async () => {
    itemRepository.getById.mockRejectedValueOnce(new Error('load_error'))

    const promise = sut.getById(input)
    await expect(promise).rejects.toThrow(new Error('load_error'))
  })
})
