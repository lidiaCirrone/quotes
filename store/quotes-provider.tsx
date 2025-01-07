'use client'

import { storedQuotes } from '@/utils/storage'
import { Quote } from '@/utils/types'
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'

type AllQuotes = Quote[] | null

interface QuotesContext {
  allQuotes: AllQuotes,
  setAllQuotes: Dispatch<SetStateAction<AllQuotes>>
}

const initialContextValue = {
  allQuotes: null,
  setAllQuotes: () => null
}

export const QuotesContext = createContext<QuotesContext>(initialContextValue)

export default function QuotesProvider({
  children,
}: {
  children: React.ReactNode
}) {

  const [allQuotes, setAllQuotes] = useState<AllQuotes>(null)

  useEffect(() => {
    setAllQuotes(storedQuotes.getAll())
  }, [])

  const contextValue = {
    allQuotes,
    setAllQuotes
  }

  return <QuotesContext.Provider value={contextValue}>{children}</QuotesContext.Provider>
}