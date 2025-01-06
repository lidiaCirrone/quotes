import clsx from "clsx"

type QuoteCardProps = {
  author: string,
  className?: string,
  text: string,
}

export default function QuoteCard({
  author,
  className,
  text,
}: QuoteCardProps) {
  return <div className={clsx("flex flex-col gap-4 bg-gray-200 p-2 rounded-lg w-full", className)}>
    <p>{text}</p>
    {author && <p className="italic" data-cy="quote-author">— {author}</p>}
  </div>
}