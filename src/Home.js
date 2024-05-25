import { createElement } from './utils';
import hero from '../public/images/dariusz-sankowski-3OiYMgDKJ6k-unsplash-larger.webp';

function Home() {
  const heroImage = createElement('img', {
    src: hero,
    alt: "dariusz-sankowski picture of a map with a dairy",
    className: 'heroImage'
   });

   const searchCard = createElement('a', {
    className: 'card', 
    textContent: 'Search Books',
    href: '/#/SearchBooks'
   });

   const favoriteCard = createElement('a', {
    className: 'card', 
    textContent: 'Favorites',
    href: '/#/Favorites'
   });

   const notesCard = createElement('a', {
    className: 'card', 
    textContent: 'Notes',
    href: '/#/Notes'
   });

  const cards = createElement('div', {
    className: 'cards',
  }, [searchCard, favoriteCard, notesCard]);

  return createElement('div', {}, [heroImage, cards]);
}

export default Home;