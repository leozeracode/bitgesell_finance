import { Item } from "../../entities/item";

export interface GetItems {
  get(input: GetItems.Input): Promise<Item>
}


export namespace GetItems {
  export type Input = {
    query?: string
    limit?: number
  }  

  export type Output = Item[]
}