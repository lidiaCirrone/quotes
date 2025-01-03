import AddQuoteForm from "@/components/AddQuoteForm";
import QuotesList from "@/components/Quotes";
import RandomQuote from "@/components/RandomQuote";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 min-h-screen sm:max-h-screen font-sans p-6 sm:max-w-[90vw] lg:max-w-[70vw] sm:mx-auto">
      <h1 className="text-3xl font-bold">Quotes</h1>
      <section className="flex flex-col sm:flex-row min-h-screen sm:min-h-0 gap-8 w-full sm:max-h-full sm:overflow-y-hidden">
        <div className="flex flex-col gap-4 sm:flex-1 sm:overflow-y-auto sm:pr-2">
          <RandomQuote />
          <AddQuoteForm />
        </div>
        <QuotesList />
      </section>
    </main>
  );
}
