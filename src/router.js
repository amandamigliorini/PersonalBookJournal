import { createElement } from './utils';

//import each different page to be rendered by the route.

import Home from './Home';
import Favorites from './Favorites';
import Notes from './Notes';
//import SearchBooks from './SearchBooks';

export function initRouter(mainView) {
  function updateView(newView) {
    mainView.innerHTML = '';
    mainView.appendChild(newView);
  }

  function hashToRoute(hash) {
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
      
      //case '#/SearchBooks':
      //  updateView(SearchBooks());
      //  break;
        
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