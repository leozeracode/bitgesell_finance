import { Item } from '@/domain/entities/item'

export interface GetItemById {
  getById: (input: GetItemById.Input) => Promise<Item>
}

export namespace GetItemById {
  export type Input = {
    id: number
  }

  export type Output = Item | null
}
