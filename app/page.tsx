import Quotes from "@/components/Quotes";
import RandomQuote from "@/components/RandomQuote";
import QuotesProvider from "@/store/quotes-provider";

export default function Home() {
  return (
    <main className="flex flex-col md:items-center md:justify-center min-h-screen font-sans p-6">
      <section className="flex flex-col gap-4">
        <QuotesProvider>
          <RandomQuote />
          <Quotes />
        </QuotesProvider>
      </section>
    </main>
  );
}
