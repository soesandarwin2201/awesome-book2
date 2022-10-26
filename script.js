//book class for single book
class Book {
 constructor(title, author) {
  this.title = title;
  this.author = author;
 }
}

const bookLists = document.getElementById('book-list');

//show booklist
class Show {
 static displayBooks() {
  const storedBooks = Storage.getBook();

  const bookCollections = storedBooks;
  bookCollections.forEach((book) => Show.addBookToList(book));
 }

 static addBookToList(book) {
  const bookLists = document.getElementById('book-list');

  const bookListRow = document.createElement('tr');

   bookListRow.innerHTML = `
   <td>${book.title}</td>
    <td>${book.author}</td>
    <td><button class="removeBtn delete" id="remove-btn">Remove</button></td>`;

    bookLists.appendChild(bookListRow);
 }

 static deleteBook(element) {
  if(element.classList.contains('delete')) {
   element.parentElement.parentElement.remove();
  }
 }
  
 
 static clearfield() {
  title.value = '';
  author.value = '';
 }
}


//local storage 
class Storage {
 static getBook() {
  let books;
  if(localStorage.getItem('books') === null) {
   books = [];
  }
  else {
   books = JSON.parse(localStorage.getItem('books'));
  }

  return books;
 }

 static addBook(book) {
 const books = Storage.getBook();
  
 books.push(book);

 localStorage.setItem('books',JSON.stringify(books));
 }

  
 static removeBook(id) {
  const books = Storage.getBook();

  books.forEach((storedBooks,index) => {
   if(storedBooks.id === id) {
    books.splice(index,1);
   }
  });

  localStorage.setItem('books',JSON.stringify(books));
 }
}


//event: display books
const form = document.getElementById('form');

window.addEventListener('DOMContentLoaded', Show.displayBooks);

//event :add a book
form.addEventListener('submit',(e) => {
 //get form value
 e.preventDefault();
 const title = document.getElementById('title').value;
 const author = document.getElementById('author').value;

 //validate
 if(title === '' || author === '' ) {
  alert("Please Fill in all fields");
 }
 else {
   //instatiate book
   const book = new Book(title, author);

   //add book to show
   Show.addBookToList(book);
   Storage.addBook(storedBooks);

   Show.clearfield();
 }
});

//remove a book
bookLists.addEventListener('click', (e) => {
 
 Show.deleteBook(e.target);
 Storage.removeBook();

});