import { Item } from '@/domain/entities'
import { ItemRepository } from '@/domain/repos'
import fs from 'fs/promises'
import { join } from 'path'

const DATA_PATH = join(__dirname, '../../../../data/items.json')

export class ItemJsonRepository implements ItemRepository {
  async getByFilter ({
    query,
    limit
  }: ItemRepository.GetByFilterInput): Promise<ItemRepository.GetAllOutput> {
    const raw = await fs.readFile(DATA_PATH, 'utf-8')
    let items = JSON.parse(raw)
    if (query) {
      items = items.filter((item: Item) => item.name.toLowerCase().includes(query.toLowerCase()))
    }

    if (limit) {
      items = items.slice(0, limit)
    }

    return items
  }

  async getStats (): Promise<ItemRepository.GetStatsOutput> {
    const items = await this.getByFilter({})
    const total = items.length
    const averagePrice = total > 0 ? items.reduce((sum, i) => sum + i.price, 0) / total : 0
    return { total, averagePrice }
  }

  async getById ({ id }: ItemRepository.GetByIdInput): Promise<ItemRepository.GetByIdOutput> {
    const items = await this.getByFilter({})
    return items.find(i => i.id === id) ?? null
  }

  async save (input: ItemRepository.SaveInput): Promise<ItemRepository.SaveOutput> {
    const items = await this.getByFilter({})
    const nextId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
    const item = {
      id: nextId,
      ...input
    }

    items.push(item)
    await fs.writeFile(DATA_PATH, JSON.stringify(items, null, 2))
    return item
  }
}
