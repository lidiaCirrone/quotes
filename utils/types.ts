export type Quote = {
  author: string;
  date: number;
  id: number;
  quote: string;
};

export type Filter = {
  saved: string;
  current: string;
};

export type RandomQuoteFromApi = {
  quoteText: string;
  quoteAuthor: string;
  senderName: string;
  senderLink: string;
  quoteLink: string;
};

export type RandomProgrammingQuoteFromApi = {
  "_id": string,
  "text": string,
  "author": string,
  "source": string,
  "numberOfVotes": number,
  "rating": number
}
