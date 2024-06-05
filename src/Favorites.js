import { renderFavorites } from './favoritesFunctions';
import { createElement } from './utils';

function Favorites() {
  return createElement('div', { className: 'favorites-page' }, [
    createElement('h2', { textContent: 'Favorites' }),
    renderFavorites()
  ]);
}

export default Favorites;