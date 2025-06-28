import { Item } from '@/domain/entities'

export interface GetItemById {
  getById: (input: GetItemById.Input) => Promise<GetItemById.Output>
}

export namespace GetItemById {
  export type Input = {
    id: number
  }

  export type Output = Item | null
}
