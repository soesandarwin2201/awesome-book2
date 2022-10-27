class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = Date.now();
  }
}

const bookListsContainer = document.getElementById('book-list-container');
const form = document.getElementById('form');
const removeBtn = document.getElementById('remove-btn');

class showBook {
  static displayBooks() {
    const books = storeBook.getBook();
    books.forEach((book) => showBook.addedBooks(book));
  }

  //display booklist
  static addedBooks(book) {
    const bookListsContainer = document.getElementById('book-list-container');
    const bookLists = document.createElement('tr');

    bookLists.innerHTML = `
   <td class="title">${book.title}</td>
   <p> by </p>
   <td class="author">${book.author}</td>
    <td> <button class="remove-btn delete" id=${book.id}>Remove</button> </td>`;

    bookListsContainer.appendChild(bookLists);
  }

  static deleteBook(element) {
    if (element.classList.contains('delete')) {
      element.parentElement.parentElement.remove();
    }
  }
}

class storeBook {
  static getBook() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = storeBook.getBook();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(id) {
    const books = storeBook.getBook();
    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//error message
const messageContainer = document.getElementById('message-container');

function alertMessage(type, message, time) {
  const paragraph = document.createElement('p');
  paragraph.classList.add('alert');
  paragraph.innerHTML = `${message}`;
  if (type === 'error') {
    paragraph.classList.add('error');
  } else if (type === 'success') {
    paragraph.classList.add('success');
  } else if (type === 'remove') {
    paragraph.classList.add('remove');
  }
  messageContainer.appendChild(paragraph);
  paragraph.classList.add('fadeout');
  setTimeout(() => {
    messageContainer.removeChild(paragraph);
  }, time);
}

window.addEventListener('DOMContentLoaded', showBook.displayBooks);

//form event
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  if (title === '' || author === '') {
    alertMessage('error', `<b>Error: </b> Please fill the empty filed!`, 4000);
  } else {
    const book = new Book(title, author);
    showBook.addedBooks(book);
    storeBook.addBook(book);
    alertMessage('success', '<b>Success:</b> Book saved successfully', 4000);
    title.value = '';
    author.value = '';
  }
});

bookListsContainer.addEventListener('click', (e) => {
  showBook.deleteBook(e.target);

  storeBook.removeBook(
    e.target.parentElement.previousElementSibling.textContent
  );
});

// navbar 

const links = document.querySelectorAll('links');
const list = document.getElementById('list');
const addForm = document.getElementById('add_book');
const contact = document.getElementById('contact');
const listLink = document.getElementById('List-link');
const addFromLink = document.getElementById('add-link');
const contactLink = document.getElementById('contact-link');


listLink.addEventListener('click',() => {
  list.classList.remove('display');
  addForm.classList.add('display');
  contact.classList.add('display');
});

addFromLink.addEventListener('click',() => {
  list.classList.add('display');
  addForm.classList.remove('display');
  contact.classList.add('display');
});

contactLink.addEventListener('click',() => {
  list.classList.add('display');
  addForm.classList.add('display');
  contact.classList.remove('display');
});
