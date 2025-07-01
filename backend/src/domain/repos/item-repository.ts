import { Item } from '@/domain/entities'

export interface ItemRepository {
  getStats: () => Promise<ItemRepository.GetStatsOutput>
  getByFilter: (input: ItemRepository.GetByFilterInput) => Promise<ItemRepository.GetAllOutput>
  getById: (input: ItemRepository.GetByIdInput) => Promise<ItemRepository.GetByIdOutput>
  save: (input: ItemRepository.SaveInput) => Promise<ItemRepository.SaveOutput>
}

export namespace ItemRepository {
  export type GetStatsOutput = {
    total: number
    averagePrice: number
  }
  export type GetByFilterInput = {
    query?: string
    limit?: number
    page?: number
  }
  export type GetAllOutput = {
    items: Item[]
    total: number
    page: number
    limit: number
    count: number
  }
  export type GetByIdOutput = Item | null
  export type SaveOutput = Item
  export type GetByIdInput = {
    id: number
  }
  export type SaveInput = Omit<Item, 'id'>
}
