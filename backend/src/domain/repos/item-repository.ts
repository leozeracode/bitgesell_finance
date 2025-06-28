import { Item } from '@/domain/entities'

export interface ItemRepository {
  getAll: () => Promise<ItemRepository.GetAllOutput>
  getById: (input: ItemRepository.GetByIdInput) => Promise<ItemRepository.GetByIdOutput>
  save: (input: ItemRepository.SaveInput) => Promise<ItemRepository.SaveOutput>
}

export namespace ItemRepository {
  export type GetAllOutput = Item[]
  export type GetByIdOutput = Item | null
  export type SaveOutput = Item
  export type GetByIdInput = {
    id: number
  }
  export type SaveInput = Omit<Item, 'id'>
}
