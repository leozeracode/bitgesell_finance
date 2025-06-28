import { Item } from '@/domain/entities'

export interface CreateItem {
  create: (input: CreateItem.Input) => Promise<CreateItem.Output>
}

export namespace CreateItem {
  export type Input = Omit<Item, 'id'>
  export type Output = Item
}
