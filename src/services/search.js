import json2params from "../utils/json2params";

const searchUrl = "https://api.github.com/search/";
const searchType = new Map([
  ["repository", "repositories"],
  ["commit", "commits"],
  ["code", "code"]
]);

export function search(keyword, page = 1, type = "repository", per_page = 10) {
  let url =
    searchUrl +
    searchType.get(type) +
    json2params({ q: keyword, page, per_page });
  return fetch(url).then(function(response) {
    return new Promise((resolve, reject) => {
      if (response.status === 200) {
        resolve(response.json());
      } else {
        reject(response.status);
      }
    });
  });
}
