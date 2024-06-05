import { createElement, setSessionStorage, getSessionStorage } from './utils';

const url = "https://openlibrary.org/search.json?q=";
const urlDetails = "https://openlibrary.org/";
const authorUrl = "https://openlibrary.org";

let booksData = {};

function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      res.json()
      throw { name: 'servicesError', message: jsonResponse };
    }
  }

export async function makeSearch(id){
    try {
        const query = getSearchWords(id.value);
        const result = await fetch(`${url}${query}`);
        const data = await convertToJson(result);
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

function getSearchWords(query){
    const queryString = query.split(" ").join("+");
    return queryString;
}

export function renderBookList(data, parent) {
    const parentElement = document.getElementById(parent);

    if (!parentElement) {
        console.error(`Element with id ${parent} not found`);
        return;
    }

    parentElement.innerHTML = "";

    if (data && data.docs && data.docs.length > 0) {
        data.docs.forEach(book => {
            getBooksData(data);
            const title = createElement("h2", { className: "bookTitle", textContent: book.title });
            const titleLink = createElement("a", { className: "bookTitle", href: `#/BookDetails${book.key}` }, [title]);
            const author = createElement("p", { className: "bookAuthor", textContent: book.author_name ? book.author_name.join(", ") : "Unknown Author" });

            let src;

            if ((book.id_goodreads && book.id_goodreads.length > 0)){
                src = `http://covers.openlibrary.org/b/goodreads/${book.id_goodreads[0]}-M.jpg`;
            }
            else if (book.oclc && book.oclc.length > 0) {
                src = `http://covers.openlibrary.org/b/oclc/${book.oclc[0]}-M.jpg`;
            } else if (book.olid && book.olid.length > 0) {
                src = `http://covers.openlibrary.org/b/olid/${book.olid[0]}-M.jpg`;
            } else if (book.isbn && book.isbn.length > 0) {
                src = `http://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`;
            } else {
                src = "#";
            }
            
            const cover = createElement("img", { className: "cover", src: src, alt: "Book Cover" });
            const coverLink = createElement("a", { href: `#/BookDetails/${encodeURIComponent(book.title)}` }, [cover]);

            const resultCard = createElement("div", { className: "resultCard" }, [titleLink, author, coverLink]);
            parentElement.appendChild(resultCard);
        });
    } else {
        const noResults = createElement("p", { textContent: "No results found." });
        parentElement.appendChild(noResults);
    }
}


export async function fetchBookDetails(bookId) {
    try {
        const result = await fetch(`${urlDetails}${bookId}.json`);
        const data = await convertToJson(result);
        storeBookInSession(bookId, data);
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export function getBooksData(data){
    data.docs.forEach(book => {
        const bookId = book.key;
        booksData[bookId] = book; 
    });
    setSessionStorage('books', booksData);
}

export function storeBookInSession(bookId, book) {
    setSessionStorage(bookId, book);
}

export async function fetchAuthorDetails(authorKey) {
    try {
        const result = await fetch(`${authorUrl}${authorKey}.json`);
        const data = await result.json();
        return data.name;
    } catch (error) {
        console.error('Error fetching author details:', error);
        return "Unknown Author";
    }
}

export function addToFavorites(book) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.key === book.key)) {
      favorites.push(book);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      console.log(`${book.title} added to favorites`);
    } else {
      console.log(`${book.title} is already in favorites`);
    }
  }