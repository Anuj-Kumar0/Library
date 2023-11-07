const addBook = document.getElementById("addBook");
const confirmBtn = document.getElementById("confirm");
const dialog = document.getElementById("dialog-Box");
const authorName = document.getElementById("author");
const titleName = document.getElementById("title");
const numberOfPages = document.getElementById("pages");
const statusValue = document.querySelector("select");
const cards = document.getElementById("div-holder");
const cancelButton = document.querySelector('button[value="cancel"]');

const myLibrary = [];

let d = 0;

function addBookToLibrary() {
  let author = authorName.value;
  let title = titleName.value;
  let pages = parseInt(numberOfPages.value);
  let status = statusValue.value;

  let book = {
    author: author,
    title: title,
    pages: pages,
    status: status,
  };

  myLibrary.push(book);

  const bookDiv = document.createElement("div");
  bookDiv.classList.add("cards-content");
  bookDiv.textContent = `*Author: ${author}\u00A0\u00A0    Title:  ${title}\u00A0\u00A0 Pages: ${pages}\u00A0\u00A0 Status: ${status}`;
  cards.appendChild(bookDiv);
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.classList.add(`${++d}`);
  deleteButton.textContent = "Delete";
  bookDiv.appendChild(deleteButton);

  deleteButton.addEventListener("click", () => {
    bookDiv.remove();
  });

  dialog.close();

  authorName.value = "";
  titleName.value = "";
  numberOfPages.value = "";
  statusValue.value = "";
}

addBook.addEventListener("click", () => {
  dialog.showModal();
});

dialog.addEventListener("close", (e) => {
  if (e.target.returnValue === "cancel") {
    authorName.value = "";
    titleName.value = "";
    numberOfPages.value = "";
    statusValue.value = "";
  }
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (document.forms[0].checkValidity()) {
    addBookToLibrary();
  } else {
    alert("Please fill in all required fields.");
  }
});

cancelButton.addEventListener("click", () => {
  dialog.close("cancel");
});
