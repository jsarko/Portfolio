const outputElement = document.getElementById("output");
const inputElement = document.getElementById("input");
let isFirstChoice = true;

// Define the file structure
const fileStructure = [
  { name: "1. About Me", content: "This is information about me." },
  { name: "2. Resume", content: "This is my resume." },
  { name: "3. Contact", content: "This is my contact information." },
  // Add more files as needed
];

// Display the file structure
function displayFileStructure() {
  if (isFirstChoice) {
    outputElement.innerHTML += "Available sections:<br>";
    fileStructure.forEach((file) => {
      outputElement.innerHTML += "    " + file.name + "<br>";
    });
    outputElement.innerHTML += "Enter the section number:";
    isFirstChoice = false;
  }
}

// Handle user input
function handleInput(event) {
  if (event.key === "Enter") {
    const input = inputElement.value.trim();
    const sectionNumber = parseInt(input);

    if (!isNaN(sectionNumber) && sectionNumber >= 1 && sectionNumber <= fileStructure.length) {
      const selectedFile = fileStructure[sectionNumber - 1];
      outputElement.innerHTML += "<br><br>" + selectedFile.content;
      outputElement.innerHTML += "<br><br>Press any key to return to the list of choices.";
      inputElement.removeEventListener("keydown", handleInput);
      document.addEventListener("keydown", handleReturn);
    } else {
      outputElement.innerHTML += "<br>Invalid section number. Please try again:";
    }

    inputElement.value = ""; // Clear the input field
  }
}

// Handle return to the list of choices
function handleReturn(event) {
  outputElement.innerHTML = ""; // Clear the output
  isFirstChoice = true;
  document.removeEventListener("keydown", handleReturn);
  inputElement.addEventListener("keydown", handleInput);
  displayFileStructure();
}

// Add event listener for user input
inputElement.addEventListener("keydown", handleInput);

// Add event listener to focus input on canvas click
const canvas = document.getElementById("terminal");
canvas.addEventListener("click", (event) => {
  if (event.target.tagName !== "A") {
    inputElement.focus();
  }
});

// Add event listener to change cursor on link hover
const links = document.querySelectorAll("a");
links.forEach((link) => {
  link.addEventListener("mouseover", () => {
    canvas.style.cursor = "pointer";
  });
  link.addEventListener("mouseout", () => {
    canvas.style.cursor = "default";
  });
});

// Initial setup
displayFileStructure();
inputElement.focus(); // Set focus to the input field
