import { Stats } from '@/domain/entities'

export interface GetStats {
  get: (input: GetStats.Input) => Promise<GetStats.Output>
}

export namespace GetStats {
  export type Input = {
    query?: string
    limit?: number
  }

  export type Output = Stats
}
