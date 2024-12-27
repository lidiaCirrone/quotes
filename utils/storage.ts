import { Quote } from "./types";

export const STORED_QUOTES_KEY = "quotes-app-data";

const webStorage = {
  get: (key: string) =>
    localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : null,
  getArray: (key: string) =>
    localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : [],
  set: (key: string, value: Quote | Quote[]) =>
    localStorage.setItem(key, JSON.stringify(value)),
};

export const storedQuotes = {
  getAll: () => webStorage.getArray(STORED_QUOTES_KEY),
  add: (newQuote: Quote) => {
    const currentQuotes = webStorage.getArray(STORED_QUOTES_KEY);
    webStorage.set(STORED_QUOTES_KEY, [...currentQuotes, newQuote]);
  },
};
