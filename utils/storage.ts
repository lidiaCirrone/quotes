import { Quote } from "./types";

export const STORED_QUOTES = "quotes-app-data";
export const HIDE_RANDOM_QUOTE = "quotes-app-hide-random";

export const webStorage = {
  get: (key: string) =>
    localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : null,
  getArray: (key: string) =>
    localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : [],
  set: (key: string, value: Quote | Quote[] | boolean) =>
    localStorage.setItem(key, JSON.stringify(value)),
};

export const storedQuotes = {
  add: (newQuote: Quote) => {
    const currentQuotes = webStorage.getArray(STORED_QUOTES);
    webStorage.set(STORED_QUOTES, [...currentQuotes, newQuote]);
  },
  getAll: () => webStorage.getArray(STORED_QUOTES),
  getLastId: () => {
    const currentQuotes = webStorage.getArray(STORED_QUOTES);
    return currentQuotes.length > 0
      ? currentQuotes[currentQuotes.length - 1].id
      : 0;
  },
};
