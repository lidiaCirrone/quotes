import Quotes from "@/components/Quotes";

export default function Home() {
  return (
    <main className="flex flex-col md:items-center md:justify-center min-h-screen font-sans p-6">
      <section className="flex flex-col gap-4 md:max-w-60 w-full">
        <h1 className="text-3xl font-bold">Quotes</h1>
        <Quotes />
      </section>
    </main>
  );
}
