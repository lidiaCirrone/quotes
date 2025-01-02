'use client'

import { useContext, useEffect, useState } from "react"
import { getRandomQuoteFromApi } from "@/services/api"
import { RandomQuoteFromApi } from "@/utils/types"
import { HIDE_RANDOM_QUOTE, storedQuotes, webStorage } from "@/utils/storage";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BiHide } from "react-icons/bi";
import { QuotesContext } from "@/store/quotes-provider"
import QuoteCard from "@/components/ui/QuoteCard"
import IconWrapper from "@/components/ui/IconWrapper"

export default function RandomQuote() {

  const { setAllQuotes } = useContext(QuotesContext)
  const [randomQuote, setRandomQuote] = useState<RandomQuoteFromApi | null>(null)
  const [hideRandomQuote, setHideRandomQuote] = useState<boolean | null>(webStorage.get(HIDE_RANDOM_QUOTE))

  async function getRandomQuote() {
    const newRandom = await getRandomQuoteFromApi()
    if (newRandom) {
      setRandomQuote({
        quoteAuthor: newRandom.author,
        quoteText: newRandom.text,
      })
    }
  }

  useEffect(() => {
    if (!hideRandomQuote)
      getRandomQuote()
  }, [])

  const handleAccept = () => {
    if (randomQuote) {
      const newQuote = {
        author: randomQuote.quoteAuthor,
        date: Date.now(),
        id: storedQuotes.getLastId() + 1,
        quote: randomQuote.quoteText
      }
      setAllQuotes(prev => ([...prev, newQuote]))
      storedQuotes.add(newQuote)
    }
  }

  const handleDismiss = () => {
    setRandomQuote(null)
  }

  const handleDontShowAnymore = () => {
    setHideRandomQuote(true)
    webStorage.set(HIDE_RANDOM_QUOTE, true)
  }

  if (hideRandomQuote || !randomQuote) return null

  return <div className="flex gap-2 mb-8">
    <QuoteCard author={randomQuote.quoteAuthor} text={randomQuote.quoteText} className="md:max-w-80" />
    <div className="flex flex-col justify-between">
      <div className="flex flex-col">
        <IconWrapper
          className="text-green-600 mt-3"
          IconComponent={AiOutlineLike}
          onClick={handleAccept}
          tooltip={{
            triggerId: "accept-tooltip",
            text: "Add this quote to your list"
          }}
        />
        <IconWrapper
          className="text-red-600 mt-3"
          IconComponent={AiOutlineDislike}
          onClick={handleDismiss}
          tooltip={{
            triggerId: "dismiss-tooltip",
            text: "Hide this quote"
          }}
        />
      </div>
      <IconWrapper
        className="text-black"
        IconComponent={BiHide}
        onClick={handleDontShowAnymore}
        tooltip={{
          triggerId: "dont-show-anymore-tooltip",
          text: "Don't show suggestions anymore"
        }}
      />
    </div>
  </div>
}