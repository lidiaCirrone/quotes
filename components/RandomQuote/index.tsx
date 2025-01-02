'use client'

import { useEffect, useState } from "react"
import { getRandomQuoteFromApi } from "@/services/api"
import { Quote } from "@/utils/types"
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

export default function RandomQuote() {

  const [randomQuote, setRandomQuote] = useState<Quote | null>(null)

  async function getRandomQuote() {
    const newRandom = await getRandomQuoteFromApi()
    if (newRandom) {
      setRandomQuote({
        author: newRandom.author,
        date: Date.now(),
        id: 0, // TODO check
        quote: newRandom.text,
      })
    }
  }

  useEffect(() => {
    getRandomQuote()
  }, [])

  const handleAccept = () => {
    // TODO
    console.log("accept this note")
  }

  const handleDismiss = () => {
    setRandomQuote(null)
  }

  // TODO check
  if (!randomQuote) return null

  return <div className="flex gap-2">
    <div className="flex flex-col p-2 bg-gray-200 rounded-lg gap-4 mb-8 md:max-w-80 w-full">
      <p>{randomQuote.quote}</p>
      <p>{randomQuote.author}</p>
    </div>
    <div className="flex flex-col">
      <AiOutlineLike onClick={handleAccept} className="text-green-600 mt-3 hover:opacity-80 cursor-pointer" size={20} />
      <AiOutlineDislike onClick={handleDismiss} className="text-red-600 mt-3 hover:opacity-80 cursor-pointer" size={20} />
    </div>
  </div>
}