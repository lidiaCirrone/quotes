'use client'

import { storedQuotes } from "@/utils/storage";
import { Quote } from "@/utils/types";
import clsx from "clsx";
import { ChangeEvent, useMemo, useState } from "react";

export default function Quotes() {

  const [quoteData, setQuoteData] = useState<Quote>({
    author: '',
    quote: ''
  })

  const [allQuotes, setAllQuotes] = useState<Quote[]>(storedQuotes.getAll())

  const isButtonDisabled = useMemo(() => quoteData.quote.trim() === '', [quoteData.quote])

  const addQuote = () => {
    const newQuote = {
      author: quoteData.author, quote: quoteData.quote
    }
    setAllQuotes(prev => ([...prev, newQuote]))
    storedQuotes.add(newQuote)
    setQuoteData({author: '', quote: ''})
  }

  const handleChange = (field: 'author' | 'quote') => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuoteData((prev) => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  return (
    <>
      <div className="flex gap-2 items-center">
        <label htmlFor="author">Author: </label>
        <input type="text" name="author" id="author" className="border-2 rounded-lg border-grey" value={quoteData.author} onChange={handleChange('author')} />
      </div>
      <textarea value={quoteData.quote} className="border-2 rounded-lg p-2 border-grey" onChange={handleChange('quote')}></textarea>
      <button className={clsx("rounded-lg p-1 ", isButtonDisabled ? 'bg-gray-400 text-white' : 'bg-sky-300 text-black hover:opacity-80')} onClick={addQuote} disabled={isButtonDisabled}>Add new quote</button>

      {allQuotes.map((item: Quote, i: number) => (
        <div key={`quote-${i}`}>
          {item.author && <p>Author: {item.author}</p>}
          <p>Content: {item.quote}</p>
        </div>
      ))}
    </>
  );
}
