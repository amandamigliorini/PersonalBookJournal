import { createElement } from './utils';
import { fetchAuthorDetails } from './Search.mjs';

async function BookDetails(book) {
  const addToFavoritesButton = createElement('button', {
    textContent: 'Add to Favorites',
    className: 'add-to-favorites-button',
    onclick: () => {
      console.log(`${book.title} added to favorites`);
    }
  });

  const authorElement = createElement('p', { textContent: 'Author: Loading...' });

  let authorNames = "Unknown Author";
  if (book.authors && book.authors.length > 0) {
    const authorKeys = book.authors.map(author => author.author.key);
    const authorNamesArray = await Promise.all(authorKeys.map(fetchAuthorDetails));
    authorNames = authorNamesArray.join(", ");
  }


  authorElement.textContent = `Author: ${authorNames}`;

  let coverUrl = "#";
  if (book.cover_edition && book.cover_edition.key) {
    coverUrl = `http://covers.openlibrary.org/b/olid/${book.cover_edition.key}-L.jpg`;
  } else if (book.covers && book.covers.length > 0) {
    coverUrl = `http://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`;
  }

  console.log("Cover URL:", coverUrl); 

  const coverElement = createElement('img', {
    src: coverUrl,
    alt: 'Book Cover',
    className: 'book-cover',
    onerror: () => {
      console.error("Error loading image:", coverUrl);
      coverElement.src = "#"; 
    }
  });

  return createElement('div', { className: 'book-details' }, [
    createElement('h2', { textContent: book.title }),
    authorElement,
    coverElement,
    createElement('p', { textContent: `First published: ${book.first_publish_date || "N/A"}` }),
    createElement('p', { className: 'description', textContent: `Description: ${book.description || "N/A"}` }),
    addToFavoritesButton
  ]);
}

export default BookDetails;