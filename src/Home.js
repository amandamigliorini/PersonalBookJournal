import { createElement } from './utils';
import hero from '../public/images/dariusz-sankowski-3OiYMgDKJ6k-unsplash-larger.webp';

function Home() {
  const heroImage = createElement('img', {
    src: hero,
    alt: "dariusz-sankowski picture of a map with a dairy",
    className: 'heroImage'
   });

   const searchCard = createElement('div', {
    className: 'card',
    innerHTML: `<a href="/#/SearchBooks">Search Books</a>` 
   });

   const favoriteCard = createElement('div', {
    className: 'card', 
    innerHTML: `<a href="/#/Favorites">Favorites</a>`
   });

   const notesCard = createElement('div', {
    className: 'card', 
    innerHTML: `<a href="/#/Notes">Notes</a>`
   });

  const cards = createElement('div', {
    className: 'cards',
  }, [searchCard, favoriteCard, notesCard]);

  return createElement('div', {className: "mainDiv"}, [heroImage, cards]);
}

export default Home;