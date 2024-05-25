import { createElement } from './utils';

function Favorites() {
  const title = createElement('h2', { textContent: 'Favorites' });

  const HomeLink = createElement('a', {
    href: '/#/Home',
    textContent: 'Link to Home',
  });

  return createElement('div', {}, [title, HomeLink]);
}

export default Favorites;