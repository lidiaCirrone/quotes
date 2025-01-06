'use client'

import { storedQuotes } from '@/utils/storage'
import { Quote } from '@/utils/types'
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'

type QuotesContext = {
  allQuotes: Quote[],
  setAllQuotes: Dispatch<SetStateAction<Quote[]>>
}

const initialContextValue = {
  allQuotes: [],
  setAllQuotes: () => null
}

export const QuotesContext = createContext<QuotesContext>(initialContextValue)

export default function QuotesProvider({
  children,
}: {
  children: React.ReactNode
}) {

  const [allQuotes, setAllQuotes] = useState<Quote[]>([])

  useEffect(() => {
    setAllQuotes(storedQuotes.getAll())
  }, [])

  const contextValue = {
    allQuotes,
    setAllQuotes
  }

  return <QuotesContext.Provider value={contextValue}>{children}</QuotesContext.Provider>
}