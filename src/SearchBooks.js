import { createElement } from './utils';
import { makeSearch, renderBookList } from './Search.mjs';

function SearchBooks() {
  const title = createElement('h2', { textContent: 'Search Books' });

  /*const categorySelect = createElement('select', {
    className: "categorySelect",
    id: "categorySelect",
    name: "categorySelect",
    innerHTML: `<option value="" selected>Please choose an option
    </option>
    <option value="Title">Title</option>
    <option value="Author">Author</option>
    <option value="Genre">Genre</option>`
  });

  const categoryLabel = createElement('label', {
    className: "categoryLabel",
    textContent: "Category: "
  });*/

  const searchInput = createElement ('input', {
    className: "searchInput",
    type: "text",
    name: "searchInput",
    id: "searchInput",
    size: "50",
    value: "The Lord of The Rings"
  });

  /*const searchLabel = createElement ('label', {
    className: "searchLabel",
    textContent: "Search for: "
  });*/

  const searchButton = createElement('button',{
    className: "searchButton",
    id: "searchButton",
    textContent: "SEARCH"
  });

 /* const categoryDiv = createElement('div', {
    className: "categoryDiv",
  }, [categoryLabel, categorySelect]);*/

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