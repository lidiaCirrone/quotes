'use client'

import IconWrapper from "@/components/ui/IconWrapper";
import QuoteCard from "@/components/ui/QuoteCard";
import { QuotesContext } from "@/store/quotes-provider";
import { Filter, Quote } from "@/utils/types";
import { ChangeEvent, KeyboardEvent, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { TbCopy, TbFilterCheck, TbFilterX } from "react-icons/tb";

export default function QuotesList() {

  const [filter, setFilter] = useState<Filter>({
    saved: "",
    current: ""
  })

  const { allQuotes } = useContext(QuotesContext)

  const filteredQuotes = useMemo(() => {
    const keywords = filter.saved.split(" ")
    return allQuotes.filter(item => filter.saved === "" || (keywords.some(word => item.author.toLowerCase().includes(word.toLowerCase()) || item.quote.toLowerCase().includes(word.toLowerCase()))))
  }, [allQuotes.length, filter.saved, filter.current])

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

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleFilterApply()
    }
  }

  const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(prev => ({ ...prev, current: e.target.value }))
  }

  return (

    <div className="flex flex-col gap-4 sm:flex-1 sm:max-h-full">

      {allQuotes.length > 0 ? (
        <div className="flex items-center justify-end gap-2 sm:pr-2">
          <label htmlFor="filter" className="shrink-0">Filter by: </label>
          <input type="text" name="filter" id="filter" className="w-full border-2 rounded-lg border-grey" value={filter.current} onChange={onFilterChange} onKeyUp={handleKeyUp} />
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
      ) : (
        <div className="sm:flex sm:items-center sm:justify-center sm:w-full sm:h-full">
          <p className="sm:bg-gray-100 sm:p-6 sm:rounded-lg sm:text-center sm:max-w-[50%]">
            You haven't added any quotes yet :(
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:overflow-y-auto sm:pr-2">
        {filteredQuotes.length > 0 ? filteredQuotes.sort((a, b) => b.date - a.date).map((item: Quote, i: number) => (
          <div key={`quote-${i}`} className="flex gap-2">
            <QuoteCard author={item.author} text={item.quote}
            />
            <IconWrapper
              wrapperClassName="h-fit mt-3"
              IconComponent={TbCopy}
              onClick={handleCopy(item)}
              tooltip={{
                triggerId: "copy-quote-tooltip",
                text: "Copy this quote"
              }}
            />
          </div>
        )) :
          <p className="bg-gray-100 p-2 rounded-lg text-center">No quote matches that filter</p>
        }
      </div>
    </div>
  );
}
