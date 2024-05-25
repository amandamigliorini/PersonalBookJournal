import { createElement } from './utils';

function SearchBooks() {
  const title = createElement('h2', { textContent: 'Search Books' });

  const HomeLink = createElement('a', {
    href: '/#/Home',
    textContent: 'Link to Home',
  });

  return createElement('div', {}, [title, HomeLink]);
}

export default SearchBooks;