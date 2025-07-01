export type Item = {
  id: number
  name: string
  category: string
  price: number
}

export type Fetchdata = {
  items: Item[]
  total: number
  page: number
  limit: number
}

export type FetchItemsParams = {
  query?: string
  page?: number
  limit?: number
  signal?: AbortSignal
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5555'


export async function fetchItems(params: FetchItemsParams): Promise<Fetchdata> {
  const query = new URLSearchParams()
  if (params.query) query.append('query', params.query)
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


export async function createItem(item: Omit<Item, 'id'>): Promise<Item> {
  const response = await fetch(`${API_URL}/api/item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })

  if (!response.ok) throw new Error('Error creating item')
  return await response.json()
}

export async function fetchStats(signal: AbortSignal): Promise<{ total: number; averagePrice: number }> {
  const response = await fetch(`${API_URL}/api/stats`, { signal })
  if (!response.ok) throw new Error('Error fetching stats')
  return await response.json()
}