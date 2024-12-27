'use client'

import { storedQuotes } from "@/utils/storage";
import { Filter, Quote } from "@/utils/types";
import clsx from "clsx";
import { ChangeEvent, useMemo, useState } from "react";
import { TbFilterCheck, TbFilterX } from "react-icons/tb";


const emptyQuote = {
  author: '',
  date: Date.now(),
  id: 0,
  quote: ''
}

export default function Quotes() {

  const [quoteData, setQuoteData] = useState<Quote>(emptyQuote)
  const [filter, setFilter] = useState<Filter>({
    saved: "",
    current: ""
  })

  const [allQuotes, setAllQuotes] = useState<Quote[]>(storedQuotes.getAll())

  const isButtonDisabled = useMemo(() => quoteData.quote.trim() === '', [quoteData.quote])

  const filteredQuotes = useMemo(() => {
    const keywords = filter.saved.split(" ")
    return allQuotes.filter(item => filter.saved === "" || (keywords.some(word => item.author.toLowerCase().includes(word) || item.quote.toLowerCase().includes(word))))
  }, [allQuotes.length, filter.saved, filter.current])

  const addQuote = () => {
    const newQuote = {
      author: quoteData.author,
      date: Date.now(),
      id: storedQuotes.getLastId() + 1,
      quote: quoteData.quote
    }
    setAllQuotes(prev => ([...prev, newQuote]))
    storedQuotes.add(newQuote)
    setQuoteData(emptyQuote)
  }

  const handleChange = (field: 'author' | 'quote') => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuoteData((prev) => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  const handleFilterApply = () => {
    setFilter(prev => ({ ...prev, saved: prev.current }))
  }

  const handleFilterRemove = () => {
    setFilter({ current: "", saved: "" })
  }

  const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(prev => ({ ...prev, current: e.target.value }))
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="author">Author: </label>
        <input type="text" name="author" id="author" className="border-2 rounded-lg border-grey" value={quoteData.author} onChange={handleChange('author')} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="quote">Quote: </label>
        <textarea name="quote" id="quote" value={quoteData.quote} className="border-2 rounded-lg p-2 border-grey" onChange={handleChange('quote')}></textarea>
      </div>
      <button className={clsx("rounded-lg p-1", isButtonDisabled ? 'bg-gray-400 text-white' : 'bg-sky-300 text-black hover:opacity-80')} onClick={addQuote} disabled={isButtonDisabled}>Add new quote</button>

      {allQuotes.length > 0 && (
        <div className="flex items-center justify-end gap-2 mt-8">
          <label htmlFor="filter">Filter by: </label>
          <input type="text" name="filter" id="filter" className="w-32 border-2 rounded-lg border-grey" value={filter.current} onChange={onFilterChange} />
          <TbFilterCheck onClick={handleFilterApply} className="hover:opacity-80 cursor-pointer" />
          <TbFilterX onClick={handleFilterRemove} className="hover:opacity-80 cursor-pointer" />
        </div>
      )}

      {filteredQuotes.sort((a, b) => b.date - a.date).map((item: Quote, i: number) => (
        <div key={`quote-${i}`} className="bg-gray-200 p-2 rounded-lg">
          {item.author && <p className="italic">by {item.author}</p>}
          <p>{item.quote}</p>
        </div>
      ))}
    </>
  );
}
