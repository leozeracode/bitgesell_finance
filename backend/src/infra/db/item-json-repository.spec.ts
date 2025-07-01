import fs from 'fs/promises'
import { ItemJsonRepository } from './item-json-repository'
import { mockItem, mockItems } from '@/domain/test'

jest.mock('fs/promises')

describe('ItemJsonRepository', () => {
  let repo: ItemJsonRepository

  const mockData = mockItems(3)

  beforeEach(() => {
    repo = new ItemJsonRepository()
    jest.clearAllMocks()
  })

  describe('getByFilter', () => {
    it('should return all items if no filter is provided', async () => {
      ;(fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockData))

      const { items } = await repo.getByFilter({})
      expect(items).toHaveLength(3)
    })

    it('should filter items by query', async () => {
      ;(fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockData))

      const { items } = await repo.getByFilter({ query: mockData[0].name })
      expect(items).toHaveLength(1)
      expect(items[0].name).toBe(mockData[0].name)
    })

    it('should limit the number of items returned', async () => {
      ;(fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockData))

      const { items } = await repo.getByFilter({ limit: 2 })
      expect(items).toHaveLength(2)
    })
  })

  describe('getStats', () => {
    it('should return total and average price', async () => {
      ;(fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockData))

      const stats = await repo.getStats()
      expect(stats.total).toBe(3)
      expect(stats.averagePrice).toBeCloseTo((mockData[0].price + mockData[1].price + mockData[2].price) / 3)
    })
  })

  describe('getById', () => {
    it('should return item by ID', async () => {
      ;(fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockData))

      const item = await repo.getById({ id: mockData[1].id })
      expect(item?.name).toBe(mockData[1].name)
    })

    it('should return null if item not found', async () => {
      ;(fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockData))

      const item = await repo.getById({ id: mockData[0].id + 100 })
      expect(item).toBeNull()
    })
  })

  describe('save', () => {
    it('should save a new item with incremented ID', async () => {
      ;(fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockData))
      const writeSpy = jest.spyOn(fs, 'writeFile').mockResolvedValue(undefined)

      const input = mockItem()
      const saved = await repo.save(input)

      expect(saved.id).toBe(input.id)
      expect(saved.name).toBe(input.name)
      expect(writeSpy).toHaveBeenCalled()
    })

    it('should save the first item if no items exist', async () => {
      ;(fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify([]))
      const writeSpy = jest.spyOn(fs, 'writeFile').mockResolvedValue(undefined)

      const input = mockItem()
      const saved = await repo.save(input)

      expect(saved.id).toBe(input.id)
      expect(writeSpy).toHaveBeenCalled()
    })
  })
})
