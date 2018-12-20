class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
    list.appendChild(row);
  }

  showAlert(message, className) {
    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');
    //create <div> tag
    const div = document.createElement('div');
    //Add class to div
    div.className = `alert ${className}`;
    //Add Text inside div
    div.appendChild(document.createTextNode(message));
    //Insert div inside container and before the form
    container.insertBefore(div, form);

    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }
}

//Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
  //Get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  //Instantiate book
  const book = new Book(title, author, isbn);

  //Instantiate UI
  const ui = new UI();

  //Validate
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all fields.', 'error');
  } else {
    //Add book to list
    ui.addBookToList(book);

    //Clear fields
    ui.clearFields();

    ui.showAlert('Book added successfully.', 'success');
  }

  e.preventDefault();
});

//Event Listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
  const ui = new UI();

  ui.deleteBook(e.target);
  ui.showAlert('Book deleted.', 'success');

  e.preventDefault();
});