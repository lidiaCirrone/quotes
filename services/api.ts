import { RandomQuoteFromApi } from "@/utils/types";

export async function getRandomQuoteFromApi(): Promise<RandomQuoteFromApi | null> {
  try {
    const response = await fetch(
      "api/1.0/?method=getQuote&format=json&lang=en"
    );
    const content = await response.json();
    return content;
  } catch (error) {
    console.error("Something went wrong while fetching a random quote :(");
    return null;
  }
}
