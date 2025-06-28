import { ItemRepository } from '@/domain/repos'
import { GetStatsService } from './get-stats'

import { mock, MockProxy } from 'jest-mock-extended'
import { GetStats } from '@/domain/usecases'
import { mockStats } from '@/domain/test/mock-stats'

describe('GetStatsService', () => {
  let sut: GetStatsService
  let itemRepository: MockProxy<ItemRepository>
  let output: GetStats.Output

  beforeAll(() => {
    output = mockStats()
    itemRepository = mock()
    itemRepository.getStats.mockResolvedValue(output)
  })

  beforeEach(() => {
    sut = new GetStatsService(itemRepository)
  })

  it('should call ItemRepository with correct input', async () => {
    await sut.get()

    expect(itemRepository.getStats).toHaveBeenCalledWith()
    expect(itemRepository.getStats).toHaveBeenCalledTimes(1)
  })

  it('should throw if ItemRepository throws', async () => {
    itemRepository.getStats.mockRejectedValueOnce(new Error('load_error'))

    const promise = sut.get()
    await expect(promise).rejects.toThrow(new Error('load_error'))
  })

  it('should return an item on success', async () => {
    const result = await sut.get()
    expect(result).toEqual(output)
  })
})
