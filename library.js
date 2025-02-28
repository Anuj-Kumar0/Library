const addBook = document.getElementById("addBook");
const confirmBtn = document.getElementById("confirm");
const dialog = document.getElementById("dialog-Box");
const authorName = document.getElementById("author");
const titleName = document.getElementById("title");
const numberOfPages = document.getElementById("pages");
const statusValue = document.getElementById("status");
const cards = document.getElementById("div-holder");
const cancelButton = document.querySelector('button[value="cancel"]');

const myLibrary = [];

// Show the modal
addBook.addEventListener("click", () => dialog.showModal());

// Close the modal and reset the form if cancelled
cancelButton.addEventListener("click", () => {
  dialog.close("cancel");
  resetForm();
});

// Function to validate input fields
function validateInput(input, message) {
  let error = input.nextElementSibling;

  if (!error || !error.classList.contains("error-message")) {
    error = document.createElement("p");
    error.classList.add("error-message");
    error.style.color = "red";
    error.style.fontSize = "14px";
    input.parentElement.appendChild(error);
  }

  if (!input.value.trim()) {
    error.textContent = message;
    return false;
  } else {
    error.textContent = "";
    return true;
  }
}

// Function to validate the entire form
function validateForm() {
  let valid = true;

  if (!validateInput(authorName, "Author name is required!")) valid = false;
  if (!validateInput(titleName, "Book title is required!")) valid = false;

  // Validate number of pages (between 1 and 5000)
  if (
    !validateInput(numberOfPages, "Pages must be between 1 and 500!") ||
    isNaN(numberOfPages.value) ||
    numberOfPages.value < 1 ||
    numberOfPages.value > 500
  ) {
    numberOfPages.nextElementSibling.textContent =
      "Pages must be between 1 and 500!";
    valid = false;
  }

  // Validate Status dropdown
  if (!statusValue.value.trim()) {
    let error = statusValue.nextElementSibling;
    if (!error || !error.classList.contains("error-message")) {
      error = document.createElement("p");
      error.classList.add("error-message");
      error.style.color = "red";
      error.style.fontSize = "14px";
      statusValue.parentElement.appendChild(error);
    }
    error.textContent = "Status is required!";
    valid = false;
  } else {
    let error = statusValue.nextElementSibling;
    if (error?.classList.contains("error-message")) {
      error.textContent = "";
    }
  }

  return valid;
}

// Real-time validation when moving out of an input field
authorName.addEventListener("blur", () =>
  validateInput(authorName, "Author name is required!")
);
titleName.addEventListener("blur", () =>
  validateInput(titleName, "Book title is required!")
);
numberOfPages.addEventListener("blur", () =>
  validateInput(numberOfPages, "Pages must be between 1 and 5000!")
);

// Remove error messages when typing
[authorName, titleName, numberOfPages].forEach((input) => {
  input.addEventListener("input", () => {
    if (input.nextElementSibling?.classList.contains("error-message")) {
      input.nextElementSibling.textContent = "";
    }
  });
});

// Handle form submission
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (validateForm()) {
    addBookToLibrary();
    alert("🎉 High five! Your book was added successfully! ✋");
  } else {
    alert("⚠ Please fix the errors before submitting.");
  }
});

// Function to add book details
function addBookToLibrary() {
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("cards-content");
  bookDiv.textContent = `📖 * Author: ${authorName.value} | Title: ${titleName.value} | Pages: ${numberOfPages.value} | Status: ${statusValue.value}`;
  cards.appendChild(bookDiv);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "Delete";
  bookDiv.appendChild(deleteButton);

  deleteButton.addEventListener("click", () => bookDiv.remove());

  dialog.close();
  resetForm();
}

// Reset form fields
function resetForm() {
  authorName.value = "";
  titleName.value = "";
  numberOfPages.value = "";
  statusValue.value = ""; // Reset status dropdown properly

  // Remove error messages
  document.querySelectorAll(".error-message").forEach((msg) => msg.remove());
}
