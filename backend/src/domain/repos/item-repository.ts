import { Item } from '@/domain/entities'

export interface ItemRepository {
  getByFilter: (input: ItemRepository.GetByFilterInput) => Promise<ItemRepository.GetAllOutput>
  getById: (input: ItemRepository.GetByIdInput) => Promise<ItemRepository.GetByIdOutput>
  save: (input: ItemRepository.SaveInput) => Promise<ItemRepository.SaveOutput>
}

export namespace ItemRepository {
  export type GetByFilterInput = {
    query?: string
    limit?: number
  }
  export type GetAllOutput = Item[]
  export type GetByIdOutput = Item | null
  export type SaveOutput = Item
  export type GetByIdInput = {
    id: number
  }
  export type SaveInput = Omit<Item, 'id'>
}
