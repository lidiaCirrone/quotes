export async function getRandomQuoteFromApi() {
  try {
    const response = await fetch(
      "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
    );
    const content = await response.json();
    return content;
  } catch (error) {
    console.error("Something went wrong while fetching a random quote :(");
    return null;
  }
}
