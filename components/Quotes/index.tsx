'use client'

import IconWrapper from "@/components/ui/IconWrapper";
import QuoteCard from "@/components/ui/QuoteCard";
import { QuotesContext } from "@/store/quotes-provider";
import { storedQuotes } from "@/utils/storage";
import { Filter, Quote } from "@/utils/types";
import clsx from "clsx";
import { ChangeEvent, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { TbCopy, TbFilterCheck, TbFilterX } from "react-icons/tb";


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

  const { allQuotes, setAllQuotes } = useContext(QuotesContext)

  const isButtonDisabled = useMemo(() => quoteData.quote.trim() === '', [quoteData.quote])

  const filteredQuotes = useMemo(() => {
    const keywords = filter.saved.split(" ")
    return allQuotes.filter(item => filter.saved === "" || (keywords.some(word => item.author.toLowerCase().includes(word.toLowerCase()) || item.quote.toLowerCase().includes(word.toLowerCase()))))
  }, [allQuotes.length, filter.saved, filter.current])

  const addQuote = () => {
    const newQuote = {
      author: quoteData.author,
      date: Date.now(),
      id: storedQuotes.getLastId() + 1,
      quote: quoteData.quote
    }
    setAllQuotes((prev: Quote[]) => ([...prev, newQuote]))
    storedQuotes.add(newQuote)
    setQuoteData(emptyQuote)
  }

  const handleChange = (field: 'author' | 'quote') => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuoteData((prev) => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  const handleCopy = (item: Quote) => () => {
    try {
      navigator.clipboard.writeText(`${item.quote}
(Author ${item.author !== "" ? item.author : 'unknown'})`)
      toast.success("The quote was successfully copied!", {})
    } catch (error) {
      toast.error("Something went wrong :(")
    }
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
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-3xl font-bold">Quotes</h1>
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
          <input type="text" name="filter" id="filter" className="w-28 border-2 rounded-lg border-grey" value={filter.current} onChange={onFilterChange} />
          <IconWrapper
            disabled={filter.current.trim() === ""}
            IconComponent={TbFilterCheck}
            onClick={handleFilterApply}
            tooltip={{
              triggerId: "apply-filter-tooltip",
              text: "Apply filter"
            }}
          />
          <IconWrapper
            IconComponent={TbFilterX}
            onClick={handleFilterRemove}
            tooltip={{
              triggerId: "remove-filter-tooltip",
              text: "Remove filter"
            }}
          />
        </div>
      )}

      {filteredQuotes.sort((a, b) => b.date - a.date).map((item: Quote, i: number) => (
        <div key={`quote-${i}`} className="flex gap-2">
          <QuoteCard author={item.author} text={item.quote} className="md:max-w-80" />
          <IconWrapper
            className="mt-3"
            IconComponent={TbCopy}
            onClick={handleCopy(item)}
            tooltip={{
              triggerId: "copy-quote-tooltip",
              text: "Copy this quote"
            }}
          />
        </div>
      ))}
    </div>
  );
}
