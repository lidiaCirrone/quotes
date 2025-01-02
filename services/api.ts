import { RandomProgrammingQuoteFromApi } from "@/utils/types";

export async function getRandomQuoteFromApi(): Promise<RandomProgrammingQuoteFromApi | null> {
  try {
    const response = await fetch("api/random");
    const content = await response.json();
    return content;
  } catch (error) {
    console.error("Something went wrong while fetching a random quote :(");
    return null;
  }
}
