const generateCountryButton = document.querySelector("#generate-country-btn");
const countryDetailsSection = document.querySelector("#country-details");

const apiEndpoint = "https://restcountries.com/v3.1/independent?status=true";

// Function to fetch all countries data
async function getCountriesData() {
    try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            throw new Error("Error fetching country data");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        alert("An error occurred while fetching country data.");
    }
}

// Function to display country details
function displayCountryInfo(country) {
    const countryInfoDiv = document.createElement("div");
    countryInfoDiv.classList.add("country-info");
    //Official name of country
    const countryName = document.createElement("h2");
    countryName.textContent = `Country: ${country.name.common}`;
    //Capital of country
    const countryCapital = document.createElement("p");
    countryCapital.textContent = `Capital: ${country.capital ? country.capital[0] : "No capital"}`;
    //Flag of country
    const countryFlag = document.createElement("img");
    countryFlag.src = country.flags.png;
    countryFlag.alt = `Flag of ${country.name.official}`;
    //Currency used
    let currency;
    if (country.currencies) {
        currency = Object.values(country.currencies).map(currency => currency.name).join(", ");
    } else {
        currency = "No currency available";
    }
    const currencyUsed = document.createElement("span")
    currencyUsed.textContent = `Currency: ${currency}`

    // Append the country info to the countryDetailsSection
    countryInfoDiv.append(countryFlag, countryName, countryCapital, currencyUsed);
    countryDetailsSection.textContent = ""; 
    countryDetailsSection.appendChild(countryInfoDiv);
}

// Function to get a random country and display its details
async function getRandomCountry() {
    const countries = await getCountriesData();
    const randomIndex = Math.floor(Math.random() * countries.length);
    const randomCountry = countries[randomIndex];
    displayCountryInfo(randomCountry);
}

// Event listener for the button click
generateCountryButton.addEventListener("click", getRandomCountry);
