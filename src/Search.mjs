import { createElement } from './utils';

const url = "https://openlibrary.org/search.json?q=";

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

export function renderBookList(data, parent){
    const parentElement = document.getElementById(parent);

    if (!parentElement) {
        console.error(`Element with id ${parent} not found`);
        return;
    }

    parentElement.innerHTML = "";

    if (data && data.docs && data.docs.length > 0) {
        data.docs.forEach(book => {
            const title = createElement("h2", { className: "bookTitle", textContent: book.title });
            const author = createElement("p", { className: "bookAuthor", textContent: book.author_name ? book.author_name.join(", ") : "Unknown Author" });

            let src;
            if (book.oclc && book.oclc.length > 0) {
                src = `http://covers.openlibrary.org/b/oclc/${book.oclc[0]}-M.jpg`;
            }
            else if (book.olid && book.olid.length > 0){
                src = `http://covers.openlibrary.org/b/olid/${book.oclc[0]}-M.jpg`;
            }
            else if (book.olid && book.olid.length > 0){
                src = `http://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`;
            }
            else {
                src = "#";
            }
            
            const cover = createElement("img", { className: "cover", src: src, alt: "Book Cover" });

            const resultCard = createElement("div", { className: "resultCard" }, [title, author, cover]);
            parentElement.appendChild(resultCard);
        });
    } else {
        const noResults = createElement("p", { textContent: "No results found." });
        parentElement.appendChild(noResults);
    }

}