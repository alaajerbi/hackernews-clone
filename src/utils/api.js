import axios from 'axios';

function fetchStoriesFromUrl(url) {
  return axios.get(url)
  .then(results => {
    return results.data;
  });
}

//fetch stories by keyword
export function fetchStoriesByKeyword(keyword, page = 0) {
  const url = window.encodeURI('https://hn.algolia.com/api/v1/search?query=' + keyword + '&tags=story&page=' + page + '&hitsPerPage=50');
  return fetchStoriesFromUrl(url);
}

function fetchFrontPageStories(page = 0) {
  const url = window.encodeURI('http://hn.algolia.com/api/v1/search?tags=front_page&page=' + page + '&hitsPerPage=50');
  return fetchStoriesFromUrl(url);
}

//fetch stories by tag
export function fetchStoriesByTag(tag, page = 0) {
  console.log(page);
  if (tag === 'front_page') {
    return fetchFrontPageStories(page);
  }
  const url = window.encodeURI('http://hn.algolia.com/api/v1/search_by_date?tags=' + tag + '&page=' + page + '&hitsPerPage=50');
  return fetchStoriesFromUrl(url);
}