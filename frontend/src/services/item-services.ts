export type Item = {
  id: number
  name: string
  category: string
  price: number
}

export type FetchItemsParams = {
  q?: string
  page?: number
  limit?: number
  signal?: AbortSignal
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5555'


export async function fetchItems(params: FetchItemsParams): Promise<Item[]> {
  const query = new URLSearchParams()
  if (params.q) query.append('q', params.q)
  if (params.page !== undefined) query.append('page', params.page.toString())
  if (params.limit !== undefined) query.append('limit', params.limit.toString())

  const response = await fetch(`${API_URL}/api/item?${query.toString()}`, { signal: params.signal })
  if (!response.ok) throw new Error('Error fetching items')
  return await response.json()
}


export async function fetchItem(id: string, signal: AbortSignal): Promise<Item> {
  const response = await fetch(`${API_URL}/api/item/${id}`, { signal })
  if (!response.ok) throw new Error(`Error fetching item with id ${id}`)
  return await response.json()
}
