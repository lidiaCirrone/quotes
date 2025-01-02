'use client'

import { useContext, useEffect, useState } from "react"
import { Tooltip } from 'react-tooltip'
import { getRandomQuoteFromApi } from "@/services/api"
import { Quote, RandomQuoteFromApi } from "@/utils/types"
import { HIDE_RANDOM_QUOTE, storedQuotes, webStorage } from "@/utils/storage";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BiHide } from "react-icons/bi";
import { QuotesContext } from "@/store/quotes-provider"

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
    <div className="flex flex-col p-2 bg-gray-200 rounded-lg gap-4 md:max-w-80 w-full">
      <p>{randomQuote.quoteText}</p>
      <p>{randomQuote.quoteAuthor}</p>
    </div>
    <div className="flex flex-col justify-between">
      <div className="flex flex-col">
        <Tooltip anchorSelect="#accept-tooltip" place="bottom">
          Add this quote to your own
        </Tooltip>
        <AiOutlineLike onClick={handleAccept} className="text-green-600 mt-3 hover:opacity-80 cursor-pointer" size={20} id="accept-tooltip" />
        <Tooltip anchorSelect="#dismiss-tooltip" place="bottom">
          Hide this quote
        </Tooltip>
        <AiOutlineDislike onClick={handleDismiss} className="text-red-600 mt-3 hover:opacity-80 cursor-pointer" size={20} id="dismiss-tooltip" />
      </div>
      <Tooltip anchorSelect="#dont-show-anymore-tooltip" place="bottom">
        Don't show suggestions anymore
      </Tooltip>
      <BiHide onClick={handleDontShowAnymore} className="text-black self-end	 hover:opacity-80 cursor-pointer" size={20} id="dont-show-anymore-tooltip" />
    </div>
  </div>
}