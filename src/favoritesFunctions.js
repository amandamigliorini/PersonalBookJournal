import { createElement, setLocalStorage, getLocalStorage } from './utils';
import { fetchAuthorDetails } from './Search.mjs';

function removeFromFavorites(bookKey) {
    let favorites = getLocalStorage('favorites') || [];
    favorites = favorites.filter(fav => fav.key !== bookKey);
    setLocalStorage('favorites', favorites);
    
    const favoritesList = document.querySelector('.favorites-list');
    favoritesList.innerHTML = '';
    favoritesList.appendChild(renderFavorites());
}
  
export function renderFavorites() {
    const favorites = getLocalStorage('favorites') || [];
    const favoritesList = createElement('div', { className: 'favorites-list' });
  
    if (favorites.length === 0) {
      favoritesList.appendChild(createElement('p', { textContent: 'No favorites added.' }));
    } else {
      favorites.forEach(async book => {

        const authorElement = createElement('p', { textContent: 'Author: Loading...' });

        let authorNames = "Unknown Author";
        if (book.authors && book.authors.length > 0) {
          const authorKeys = book.authors.map(author => author.author.key);
          const authorNamesArray = await Promise.all(authorKeys.map(fetchAuthorDetails));
          authorNames = authorNamesArray.join(", ");
        }
      
        authorElement.textContent = `Author: ${authorNames}`;
        authorElement.textContent = `Author: ${authorNames}`;



        const bookElement = createElement('div', { className: 'favorite-book' }, [
          createElement('h3', { textContent: book.title }),
          authorElement,
          createElement('button', {
            textContent: 'Remove from Favorites',
            className: 'remove-from-favorites-button'
          })
        ]);
  
        const removeButton = bookElement.querySelector('.remove-from-favorites-button');
        removeButton.addEventListener('click', () => removeFromFavorites(book.key));
  
        favoritesList.appendChild(bookElement);
      });
    }
  
    return favoritesList;
}