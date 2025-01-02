'use client'

import IconWrapper from "@/components/ui/IconWrapper";
import QuoteCard from "@/components/ui/QuoteCard";
import { getRandomQuoteFromApi } from "@/services/api";
import { QuotesContext } from "@/store/quotes-provider";
import { HIDE_RANDOM_QUOTE, storedQuotes, webStorage } from "@/utils/storage";
import { RandomQuoteFromApi } from "@/utils/types";
import { useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BiHide } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";

export default function RandomQuote() {

  const { allQuotes, setAllQuotes } = useContext(QuotesContext)
  const [randomQuote, setRandomQuote] = useState<RandomQuoteFromApi | null>(null)
  const [hideRandomQuote, setHideRandomQuote] = useState<boolean | null>(webStorage.get(HIDE_RANDOM_QUOTE))

  const randomQuoteAlreadyAdded = useMemo(
    () => !hideRandomQuote && randomQuote ? allQuotes.find(item => item.quote === randomQuote?.quoteText) : false,
    [hideRandomQuote, allQuotes.length, randomQuote?.quoteText]
  )

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
    if (randomQuoteAlreadyAdded) {
      toast.error("It seems like this quote is already on your list...")
    } else if (randomQuote) {
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
        {
          randomQuoteAlreadyAdded ?
            <IconWrapper
              className="mt-3 cursor-default"
              IconComponent={FaCheck}
              tooltip={{
                triggerId: "already-added-tooltip",
                text: "This quote is already on your list"
              }}
            /> :
            <>
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
            </>
        }
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