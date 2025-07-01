import { Item } from '@/domain/entities'

export interface GetItems {
  get: (input: GetItems.Input) => Promise<GetItems.Output>
}

export namespace GetItems {
  export type Input = {
    query?: string
    limit?: number
    page?: number
  }

  export type Output = {
    items: Item[]
    total: number
    page: number
    limit: number
  }
}
