import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type Input<T = any> = {
  setFilter: Dispatch<SetStateAction<T>>
}

type Output = {
  setSearchTerm: Dispatch<SetStateAction<string>>
  searchTerm: string
}

export const useKeywordFilter = <T = any>({
  setFilter,
}: Input<T>): Output => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    if (searchTerm !== undefined) {
      const delayDebounceFn = setTimeout(() => {
        setFilter((prev) => ({ ...prev, query: searchTerm }))
      }, 1000)
      return () => { clearTimeout(delayDebounceFn) }
    }
  }, [searchTerm])

  return {
    setSearchTerm,
    searchTerm
  }
}
