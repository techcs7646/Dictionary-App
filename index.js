// Get DOM elements
const wordInput = document.getElementById("wordInput");
const searchBtn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");

// Add event listener to the search button
searchBtn.addEventListener("click", () => {
  const word = wordInput.value.trim(); // Get the input value

  if (word) {
    fetchDefinition(word); // Call the function to fetch the definition
  } else {
    resultDiv.innerHTML = "<p>Please enter a word.</p>";
  }
});

// Function to fetch the word definition from the API
function fetchDefinition(word) {
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayDefinition(data);
    })
    .catch(() => {
      resultDiv.innerHTML = `<p>Could not find the word "${word}". Please try another word.</p>`;
    });
}

// Function to display the word definition in the DOM
function displayDefinition(data) {
  // Clear the result div
  resultDiv.innerHTML = "";

  if (data.title === "No Definitions Found") {
    resultDiv.innerHTML = `<p>No definitions found for "${wordInput.value}". Please try another word.</p>`;
    return;
  }

  // Get the first meaning
  const definition = data[0].meanings[0].definitions[0].definition;
  const example = data[0].meanings[0].definitions[0].example;

  // Display the word and its definition
  resultDiv.innerHTML = `
        <h3>Word: ${data[0].word}</h3>
        <p><strong>Definition:</strong> ${definition}</p>
        ${example ? `<p><strong>Example:</strong> ${example}</p>` : ""}
    `;
}
