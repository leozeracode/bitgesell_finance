import { Stats } from '@/domain/entities'

export interface GetStats {
  get: () => Promise<GetStats.Output>
}

export namespace GetStats {
  export type Output = Stats
}
