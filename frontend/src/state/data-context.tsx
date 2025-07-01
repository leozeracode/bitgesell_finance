import React, { createContext, useContext, useState, useCallback } from 'react'
import { fetchItems, Item } from '../services/item-services'

interface DataContextType {
  items: Item[]
  loading: boolean
  fetchItemsData: (params: { q?: string; page?: number; limit?: number; signal?: AbortSignal }) => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([])
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
        setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return (
    <DataContext.Provider value={{ items, loading, fetchItemsData }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
