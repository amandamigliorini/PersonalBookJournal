import { createElement } from './utils';
import { makeSearch, renderBookList } from './Search.mjs';

function SearchBooks() {
  const title = createElement('h2', { textContent: 'Search Books' });

  const searchInput = createElement ('input', {
    className: "searchInput",
    type: "text",
    name: "searchInput",
    id: "searchInput",
    size: "50",
    placeholder: "The Lord of The Rings"
  });

  const searchButton = createElement('button',{
    className: "searchButton",
    id: "searchButton",
    textContent: "Get Books!"
  });

  const searchDiv = createElement('div', {
    className: "searchDiv",
  }, [searchInput]);

  const results = createElement('div', {className: "results", id: "results"});

  const search = createElement('div', {className: "search"}, [searchDiv, searchButton]);
  const resultsDiv = createElement('div', {className: "resultsDiv"}, [results]);


  searchButton.addEventListener('click', async () => {
    const data = await makeSearch(searchInput);
    renderBookList(data, "results");

  });

  return createElement('div', {className: "mainSearch"}, [title, search, resultsDiv]);

}


export default SearchBooks;