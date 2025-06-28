import { Item } from '@/domain/entities'

export interface GetItems {
  get: (input: GetItems.Input) => Promise<GetItems.Output>
}

export namespace GetItems {
  export type Input = {
    query?: string
    limit?: number
  }

  export type Output = Item[]
}
