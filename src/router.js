import { createElement, getSessionStorage } from './utils';
import { fetchBookDetails, storeBookInSession } from './Search.mjs';

//import each different page to be rendered by the route.

import Home from './Home';
import Favorites from './Favorites';
import BookDetails from './BookDetails';
import SearchBooks from './SearchBooks';

export function initRouter(mainView) {
  function updateView(newView) {
    mainView.innerHTML = '';
    mainView.appendChild(newView);
  }

  async function hashToRoute(hash) {
    const match = hash.match(/^#\/BookDetails\/(.+)$/);
    if (match) {
      const bookId = decodeURIComponent(match[1]);
      const storedBook = getSessionStorage(bookId);
      
      if (storedBook) {
        const bookDetailsNode = await BookDetails(storedBook);
        updateView(bookDetailsNode);
      } else {
        try {
          const book = await fetchBookDetails(bookId);
          storeBookInSession(bookId, book);
          const bookDetailsNode = await BookDetails(book);
          updateView(bookDetailsNode);
        } catch (error) {
          console.error(error);
          updateView(createElement('h3', { textContent: 'Book not found' }));
        }
      }
      return;
    }

    switch (hash) {
      case '#/Home':
        updateView(Home());
        break;

      case '#/Favorites':
        updateView(Favorites());
        break;

      case '#/Notes':
        updateView(Notes());
        break;

      case '#/SearchBooks':
        updateView(SearchBooks());
        break;

      default:
        updateView(createElement('h3', { textContent: '404 Page Not Found' }));
        break;
    }
  }

  const defaultHash = window.location.hash || '#/Home';
  hashToRoute(defaultHash);

  window.addEventListener('hashchange', (evt) => {
    const newUrl = new URL(evt.newURL);
    const hash = newUrl.hash;

    hashToRoute(hash);
  });
}