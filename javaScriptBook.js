const myLibrary = [];
let nextId = 0;

function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(nextId++, title, author, pages, read);
  myLibrary.push(newBook);
}

function removeBookFromLibrary(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) myLibrary.splice(index, 1);
}

function toggleReadStatus(id) {
  const book = myLibrary.find((book) => book.id === id);
  if (book) book.read = !book.read;
}

const addBookButton = document.getElementById("addBookButton");
const newBookForm = document.getElementById("newBookForm");
const cancelAddBook = document.getElementById("cancelAddBook");
const bookList = document.getElementById("bookList");
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const pagesInput = document.getElementById("pagesInput");
const readInput = document.getElementById("readInput");

function render() {
  bookList.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.dataset.id = book.id;

    const titleEl = document.createElement("h3");
    titleEl.textContent = book.title;

    const authorEl = document.createElement("p");
    authorEl.textContent = `by ${book.author}`;

    const pagesEl = document.createElement("p");
    pagesEl.textContent = `${book.pages} pages`;

    const readLabel = document.createElement("label");
    const readCheckbox = document.createElement("input");
    readCheckbox.type = "checkbox";
    readCheckbox.className = "read-toggle";
    readCheckbox.checked = book.read;
    readLabel.append(readCheckbox, " Read");

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-btn";
    removeButton.textContent = "Remove";

    const idNumber = document.createElement("p");
    idNumber.type = "text";
    idNumber.textContent = `ID: ${book.id}`;

    card.append(titleEl, authorEl, pagesEl, readLabel, removeButton, idNumber);
    bookList.appendChild(card);
  });
}

addBookButton.addEventListener("click", () => {
  newBookForm.hidden = !newBookForm.hidden;
});

cancelAddBook.addEventListener("click", () => {
  newBookForm.reset();
  newBookForm.hidden = true;
});

newBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary(
    titleInput.value,
    authorInput.value,
    Number(pagesInput.value),
    readInput.checked
  );
  render();
  newBookForm.reset();
  newBookForm.hidden = true;
});

bookList.addEventListener("click", (event) => {
  const card = event.target.closest(".book-card");
  if (!card) return;
  const id = Number(card.dataset.id);

  if (event.target.matches(".remove-btn")) {
    removeBookFromLibrary(id);
    render();
  } else if (event.target.matches(".read-toggle")) {
    toggleReadStatus(id);
    render();
  }
});

addBookToLibrary("How to be a good a man", "Venezuelan dude", 1500, true);

addBookToLibrary("How to grocery shop", "Venezuela Dude", 200, false);

render();
