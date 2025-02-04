'use client'

import { AllQuotes, QuotesContext } from "@/store/quotes-provider";
import { storedQuotes } from "@/utils/storage";
import { Quote } from "@/utils/types";
import clsx from "clsx";
import { ChangeEvent, useContext, useMemo, useState } from "react";


const emptyQuote = {
  author: '',
  date: Date.now(),
  id: 0,
  quote: ''
}

export default function AddQuoteForm() {

  const [quoteData, setQuoteData] = useState<Quote>(emptyQuote)

  const { setAllQuotes } = useContext(QuotesContext)

  const isButtonDisabled = useMemo(() => quoteData.quote.trim() === '', [quoteData.quote])

  const addQuote = () => {
    const newQuote = {
      author: quoteData.author.trim(),
      date: Date.now(),
      id: storedQuotes.getLastId() + 1,
      quote: quoteData.quote.trim()
    }
    setAllQuotes((prev: AllQuotes) => ([...(prev || []), newQuote]))
    storedQuotes.add(newQuote)
    setQuoteData(emptyQuote)
  }

  const handleChange = (field: 'author' | 'quote') => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuoteData((prev) => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2">
        <label htmlFor="author">Author: </label>
        <input type="text" name="author" id="author" className="border-2 rounded-lg border-grey" value={quoteData.author} onChange={handleChange('author')} data-cy="new-quote-author" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="quote">Quote: </label>
        <textarea name="quote" id="quote" value={quoteData.quote} className="border-2 rounded-lg p-2 border-grey" onChange={handleChange('quote')} data-cy="new-quote-text"></textarea>
      </div>
      <button className={clsx("rounded-lg p-1", isButtonDisabled ? 'bg-gray-400 text-white' : 'bg-sky-300 text-black hover:opacity-80')} onClick={addQuote} disabled={isButtonDisabled} data-cy="new-quote-add-button">Add new quote</button>
    </div>
  );
}
