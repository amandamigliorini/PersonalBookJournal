import { createElement } from './utils';

function Notes() {
  const title = createElement('h2', { textContent: 'Notes' });

  const HomeLink = createElement('a', {
    href: '/#/Home',
    textContent: 'Link to Home',
  });

  return createElement('div', {}, [title, HomeLink]);
}

export default Notes;