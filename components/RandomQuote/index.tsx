'use client'

import IconWrapper from "@/components/ui/IconWrapper";
import QuoteCard from "@/components/ui/QuoteCard";
import { getRandomQuoteFromApi } from "@/services/api";
import { QuotesContext } from "@/store/quotes-provider";
import { HIDE_RANDOM_QUOTE, storedQuotes, webStorage } from "@/utils/storage";
import { RandomQuoteFromApi } from "@/utils/types";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure
} from "@nextui-org/modal";
import clsx from "clsx";
import { useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BiHide } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineLightBulb } from "react-icons/hi";

export default function RandomQuote() {

  const { allQuotes, setAllQuotes } = useContext(QuotesContext)
  const [randomQuote, setRandomQuote] = useState<RandomQuoteFromApi | null>(null)
  const [hideRandomQuote, setHideRandomQuote] = useState<boolean | null>(webStorage.get(HIDE_RANDOM_QUOTE))


  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

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
      onClose()
    }
  }

  const handleDismiss = () => {
    setRandomQuote(null)
  }

  const handleDontShowAnymore = () => {
    setHideRandomQuote(true)
    webStorage.set(HIDE_RANDOM_QUOTE, true)
    onClose()
  }

  if (hideRandomQuote || !randomQuote) return null

  const RandomQuoteCard = () => {
    const iconWrapperClassName = "bg-gray-100 sm:bg-transparent p-2 sm:p-0 rounded-lg shrink-0 w-full sm:w-auto flex gap-2"
    return (<>
      <QuoteCard author={randomQuote.quoteAuthor} text={randomQuote.quoteText} className="max-h-[45vh] sm:max-h-none md:max-w-80 overflow-y-auto sm:overflow-y-visible" />
      <div className="flex flex-col justify-between gap-4 sm:gap-2">
        <div className="flex flex-col gap-2">
          {
            randomQuoteAlreadyAdded ?
              <IconWrapper
                wrapperClassName={clsx(iconWrapperClassName, "!cursor-default")}
                IconComponent={FaCheck}
                mobileLabel
                tooltip={{
                  triggerId: "already-added-tooltip",
                  text: "This quote is already on your list"
                }}
              /> :
              <>
                <IconWrapper
                  wrapperClassName={clsx(iconWrapperClassName, "text-green-600")}
                  IconComponent={AiOutlineLike}
                  mobileLabel
                  onClick={handleAccept}
                  tooltip={{
                    triggerId: "accept-tooltip",
                    text: "Add this quote to your list"
                  }}
                />
                <IconWrapper
                  wrapperClassName={clsx(iconWrapperClassName, "hidden sm:flex text-red-600")}
                  IconComponent={AiOutlineDislike}
                  mobileLabel
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
          wrapperClassName={clsx(iconWrapperClassName, "!bg-gray-700 sm:!bg-transparent text-white sm:text-black")}
          IconComponent={BiHide}
          mobileLabel
          onClick={handleDontShowAnymore}
          tooltip={{
            triggerId: "dont-show-anymore-tooltip",
            text: "Don't show suggestions anymore"
          }}
        />
      </div>
    </>)
  }

  return (
    <>
      <IconWrapper
        IconComponent={HiOutlineLightBulb}
        onClick={onOpen}
        className="text-white w-10 h-10 p-2 rounded-full bg-yellow-500 hover:bg-opacity-hover transition-background"
        wrapperClassName="sm:hidden fixed top-4 right-4"
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center"
        size="full"
        className="rounded-lg sm:hidden"
        classNames={{
          closeButton: "w-10 h-10 p-2 m-4 items-center justify-center flex bg-gray-700 hover:bg-opacity-hover transition-background text-white"
        }}>
        <ModalContent className="font-sans py-12 px-8">
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl">Need some inspiration?</ModalHeader>
            <ModalBody className="justify-between">
              <RandomQuoteCard />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
      <div className="sm:flex gap-2 mb-8 hidden">
        <RandomQuoteCard />
      </div>
    </>
  )
}