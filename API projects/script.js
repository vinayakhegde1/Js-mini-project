// Defining the variables to access the HTML elements
const countryInput = document.getElementById('countryInput');
const searchBtn = document.getElementById('searchButton'); // Corrected variable name
const countryInfo = document.getElementById('countryInfo');

// Defining the base URL for the REST Countries API
const apiUrl = 'https://restcountries.com/v3/name/';

// Define a function that will display the country's information
function displayCountryInfo(countryData) { // Changed function name to match the one used in the event listener
    // Display name, capital, population, currency, language, region
    const countryName = countryData.name.common;
    const population = countryData.population.toLocaleString(); // Corrected method name
    const capital = countryData.capital[0];
    const currency = countryData.currencies ? countryData.currencies[Object.keys(countryData.currencies)[0]].name : 'N/A';
    const language = countryData.languages ? Object.values(countryData.languages)[0] : 'N/A';
    const region = countryData.region;

    // Create HTML content to display country information
    const countryInfoHTML =
        `<div id="countryName">${countryName}</div>
         <div class="countryData">Capital: ${capital}</div>
         <div class="countryData">Population: ${population}</div>
         <div class="countryData">Region: ${region}</div>
         <div class="countryData">Currency: ${currency}</div>
         <div class="countryData">Language: ${language}</div>`;

    // Update the countryInfo container with the HTML content
    countryInfo.innerHTML = countryInfoHTML;
}

// Define an event listener for the search button
    searchBtn.addEventListener('click', function () {
    const searchTerm = countryInput.value;

    // Check if the input is empty
    if (searchTerm.trim() === '') {
        countryInfo.textContent = 'Please enter a country name.';
        return;
    }

    // Make an API request to fetch country data
    fetch(apiUrl + searchTerm)
        .then((response) => {
            // Check if the API response is successful
            if (response.ok) {
                return response.json(); // Parse the JSON response
            } else {
                throw new Error('Country not found');
            }
        })
        .then((data) => {
            // Call the displayCountryInfo function to display country data
            displayCountryInfo(data[0]);
        })
        .catch((error) => {
            countryInfo.textContent = 'Country not found or an error occurred.';
        });
});
