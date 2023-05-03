/* Get DOM elements */
const addBookForm = document.getElementById('add-book-form');
const bookList = document.getElementById('book-list');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const bookPages = document.getElementById('book-pages');
const bookRead = document.getElementById('book-read');

/* Create book object */
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

/* Store books in an array */
let myLibrary = [];

/* Add book to the array */
function addBookToLibrary() {
  const title = bookTitle.value;
  const author = bookAuthor.value;
  const pages = bookPages.value;
  const read = bookRead.checked;

  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

/* Create book list */
function render() {
  bookList.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('li');
    bookCard.setAttribute('data-index', index);

    const title = document.createElement('h3');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.textContent = `by ${book.author}`;

    const pages = document.createElement('p');
    pages.textContent = `${book.pages} pages`;

    const read = document.createElement('button');
    read.textContent = book.read ? 'Read' : 'Unread';
    read.addEventListener('click', () => {
      book.read = !book.read;
      render();
    });

    const remove = document.createElement('button');
    remove.textContent = 'Remove';
    remove.addEventListener('click', () => {
      myLibrary.splice(index, 1);
      render();
    });

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    bookCard.appendChild(remove);

    bookList.appendChild(bookCard);
  });
}

/* Add book form submit event */
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary();
  render();
  addBookForm.reset();
});

/* Add some sample books to the array */
myLibrary.push(new Book('To Kill a Mockingbird', 'Harper Lee', 281, true));
myLibrary.push(new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, false));
myLibrary.push(new Book('1984', 'George Orwell', 328, true));

/* Render the book list */
render();


// Get the modal
var modal = document.getElementById("setup-modal");

// Get the button that opens the modal
var btn = document.getElementById("get-started-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

