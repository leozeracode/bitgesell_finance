import React, { createContext, useContext, useState, useCallback } from 'react'
import { Fetchdata, fetchItems, Item } from '../services/item-services'

interface DataContextType {
  data: {
    items: Item[]
    total: number
    page: number
    limit: number
  }
  loading: boolean
  fetchItemsData: (params: { q?: string; page?: number; limit?: number; signal?: AbortSignal }) => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<Fetchdata>({
    items: [],
    total: 0,
    page: 1,
    limit: 10,
  })
  const [loading, setLoading] = useState(false)

  const fetchItemsData = useCallback(
    async ({
      q,
      page,
      limit,
      signal,
    }: { q?: string; page?: number; limit?: number; signal?: AbortSignal }) => {
      setLoading(true)
      try {
        const data = await fetchItems({ q, page, limit, signal })
        setData(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return (
    <DataContext.Provider value={{ data, loading, fetchItemsData }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
