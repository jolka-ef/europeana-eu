import { API_key } from "../API_key";

export const createQuery = (query, cursorMark, resultsPerSearch = 3) => {
  return `https://api.europeana.eu/record/v2/search.json?wskey=${API_key}&query=${query}&language=en&theme=art&profile=minimal&qf=TYPE:IMAGE&thumbnail=true&rows=${resultsPerSearch}&sort=europeana_id&cursor=${cursorMark}`;
};
