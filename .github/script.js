// bookCollection
let bookCollections = [];

const bookLists = document.getElementById('book-lists');
const addForm = document.getElementById('form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const removeBtn = document.getElementById('remove-btn');

function showBookLists(books) {
 const bookDiv = document.createElement('div');

 bookDiv.innerHTML = `
 <h1 class="title">${books.title}</h1>
    <p class="author">${books.author}</p>
    <button id="remove-btn">Remove</button>
    <hr>`;

   bookLists.appendChild(bookDiv);
}



addForm.addEventListener('submit', (e) => {
 e.preventDefault();
 
 if(title.value === '' && author.value === '') {
  alert("PLease fill the form");
 }
 else {
  const singleBook = {
   id : bookCollections.length+1,
   title : title.value,
   author: author.value
  }
  bookCollections.push(singleBook);
  showBookLists(singleBook);
  title.value = '';
  author.value = '';
  
 }
})

console.log(typeof(bookCollections));




