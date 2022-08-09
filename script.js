let myLibrary = [];
let bookTitle = document.getElementById("bookTitle");
let bookAutor = document.getElementById("bookAutor");
let bookPages = document.getElementById("bookPages");
let alreadyRead = document.getElementById("alreadyRead");
let errorMessage1 = document.getElementById("errorMessage1");
let errorMessage2 = document.getElementById("errorMessage2");
let errorMessage3 = document.getElementById("errorMessage3");
let submitButton = document.getElementById("submitButton");
let myBooks =  document.getElementById("myBooks");

function Book(title, autor, pages, read) {
    this.title = title
    this.autor = autor
    this.pages = pages
    this.read = read
    this.id = title.replace(/\s+/g, '').toLowerCase();
}

function addBookToLibrary() {
    myLibrary.push(new Book(bookTitle.value, bookAutor.value, bookPages.value, alreadyRead.checked));
    bookTitle.value = "";
    bookAutor.value = "";
    bookPages.value = "";
    alreadyRead.checked = false;
    submitButton.disabled = true;
    createCard();
}

function createCard() {
    let last = myLibrary.length - 1;
    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.setAttribute('data-id',myLibrary[last]["id"]);
    myBooks.appendChild(cardDiv);

    let cardTitle = document.createElement("div");
    cardTitle.className = "cardTitle";
    cardTitle.textContent = myLibrary[last]["title"];
    document.querySelector('[data-id="' + myLibrary[last]["id"] + '"]').appendChild(cardTitle);

    let cardText = document.createElement("div");
    cardText.className = "cardText";
    document.querySelector('[data-id="' + myLibrary[last]["id"] + '"]').appendChild(cardText);

    let autorName = document.createElement("div");
    autorName.textContent = 'Autor: ' + myLibrary[last]["autor"];
    document.getElementsByClassName("cardText")[last].appendChild(autorName);

    let numberOfPages = document.createElement("div");
    numberOfPages.textContent = 'Pages: ' + myLibrary[last]["pages"];
    document.getElementsByClassName("cardText")[last].appendChild(numberOfPages);
    
    let bookRead = document.createElement("div");
    if (myLibrary[last]["read"] === true) {
        bookRead.textContent = "Already Read";
    } else {
        bookRead.textContent = "Not read yet"
    };
    bookRead.setAttribute('data-status',myLibrary[last]["id"]);
    document.getElementsByClassName("cardText")[last].appendChild(bookRead);

    let cardButtons = document.createElement("div");
    cardButtons.className = "cardButtons";
    cardButtons.setAttribute('data-buttons',myLibrary[last]["id"]);
    document.querySelector('[data-id="' + myLibrary[last]["id"] + '"]').appendChild(cardButtons);


    let readButton = document.createElement("img");
    readButton.src = "./svgs/eye-plus-outline.svg";
    readButton.className = "icon";
    readButton.setAttribute('data-read',myLibrary[last]["id"]);
    readButton.onclick = function() {readStatus(this.getAttribute("data-read"));};
    document.querySelector('[data-buttons="' + myLibrary[last]["id"] + '"]').appendChild(readButton);

    let deleteButton = document.createElement("img");
    deleteButton.src = "./svgs/close-box.svg";
    deleteButton.className = "icon";
    deleteButton.setAttribute('data-remove',myLibrary[last]["id"]);
    deleteButton.onclick = function() {removeBook(this.getAttribute("data-remove"));};
    document.querySelector('[data-buttons="' + myLibrary[last]["id"] + '"]').appendChild(deleteButton);

}

function validateForm() {
    let clonedTitle = bookTitle.value.replace(/\s+/g, '').toLowerCase();
    let cloned = myLibrary.findIndex(object => {
        return object.id === clonedTitle;
    });
    
    if (cloned == -1) {
        errorMessage1.textContent = "";
        if (bookTitle.value === "") {
            errorMessage1.textContent = "*Required";
        } else if (bookAutor.value === "") {
            errorMessage1.textContent = "";
            errorMessage2.textContent = "*Required";
        } else if (bookPages.value === "") {
            errorMessage2.textContent = "";
            errorMessage3.textContent = "*Required";
        } else {
            errorMessage3.textContent = "";
            submitButton.disabled = false;
        }
    } else {
        errorMessage1.textContent = "This book is already on your library";
        submitButton.disabled = true;
    }
}

function removeBook(bookId) {
    let trashCard = document.querySelector('[data-id="' + bookId + '"]')
    trashCard.remove();
    console.log(myLibrary);
    myLibrary = myLibrary.filter(data => data.id != bookId);
    console.log(myLibrary);
}

function readStatus(bookStatus) {
    let statusDiv  = document.querySelector('[data-status="' + bookStatus + '"]');
    let statusArray = myLibrary.findIndex(object => {
        return object.id === bookStatus;
    });

    if (myLibrary[statusArray].read === true) {
        myLibrary[statusArray].read = false;
        statusDiv.textContent = "Not read yet";
    } else {
        myLibrary[statusArray].read = true;
        statusDiv.textContent = "Already read";
    }

    
    
}

bookTitle.onchange = validateForm;
bookAutor.onchange = validateForm;
bookPages.onchange = validateForm;
bookTitle.onkeyup = validateForm;
bookAutor.onkeyup = validateForm;
bookPages.onkeyup = validateForm;