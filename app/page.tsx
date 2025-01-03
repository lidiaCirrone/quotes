import Quotes from "@/components/Quotes";
import RandomQuote from "@/components/RandomQuote";

export default function Home() {
  return (
    <main className="flex flex-col md:items-center md:justify-center min-h-screen font-sans p-6">
      <section className="flex gap-4 w-full">
        <RandomQuote />
        <Quotes />
      </section>
    </main>
  );
}
