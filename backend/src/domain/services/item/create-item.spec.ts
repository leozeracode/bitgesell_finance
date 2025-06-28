import { mock, MockProxy } from 'jest-mock-extended'
import { ItemRepository } from '@/domain/repos'
import { CreateItemService } from './create-item'
import { CreateItem } from '@/domain/usecases'
import { mockItem, mockItemWithoutId } from '@/domain/test'

describe('CreateItemService', () => {
  let repo: MockProxy<ItemRepository>
  let sut: CreateItemService
  let model: CreateItem.Output
  let input: CreateItem.Input

  beforeAll(() => {
    model = mockItem()
    input = mockItemWithoutId()

    repo = mock()
    repo.save.mockResolvedValue(model)
  })

  beforeEach(() => {
    sut = new CreateItemService(repo)
  })

  it('should call ItemRepository with correct id', async () => {
    await sut.create(input)

    expect(repo.save).toHaveBeenCalledWith(input)
    expect(repo.save).toHaveBeenCalledTimes(1)
  })

  it('should throw if ItemRepository throws', async () => {
    repo.save.mockRejectedValueOnce(new Error('save_error'))

    const promise = sut.create(input)
    await expect(promise).rejects.toThrow(new Error('save_error'))
  })

  it('should return a item on success', async () => {
    const item = await sut.create(input)
    expect(item).toEqual(model)
  })
})
