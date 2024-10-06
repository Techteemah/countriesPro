const parentElement = document.getElementById('allCountries');
let countries
fetch('https://restcountries.com/v3.1/all')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(allCountries => {

        allCountries.forEach(element => {
            const childElement = `<div class="countryCard" id = ${element.region} >
        <img src=${element.flags.png} alt="">
        <h2>${element.name.common}</h2>
        <p> <span> Population:</span> ${element.population}</p>
        <p> <span> Region:</span> ${element.region}</p>
        <p> <span> Capital: </span> ${element.capital}</p>
    </div>`
            const tempElement = document.createElement("div");
            tempElement.innerHTML = childElement;

            let countryHtml = tempElement.querySelector(".countryCard");

            parentElement.appendChild(countryHtml)




            countryHtml.addEventListener("click", () => {

                filter.style.display = "none"
                searchInput.style.display = "none"

                const EachCountryInfo = `
        <div class="countryDetailsContainer">
          <div id="backFlag">
            <button id="backButton"> ←  Back</button>
          <img src="${element.flags.png}" alt="Flag of ${element.name.common}">
          </div>
            

          <div class="countryDetails">
            <h2>${element.name.common} </h2>
            <p><span>Population:</span> ${element.population.toLocaleString()}
            <p><span>Region:</span> ${element.region}</p>
            <p><span>Sub Region:</span> ${element.subregion}</p>
            <p><span>Capital:</span> ${element.capital}</p>
            <p><span>Currencies:</span> ${Object.values(element.currencies).map(currency => currency.name).join(", ")}</p>
            <p><span>Top Level Domain:</span> ${element.tld}</p>
            <p><span>Languages:</span> ${Object.values(element.languages).join(", ")}</p> 
        
          </div>
          
        </div>`;
                parentElement.innerHTML = EachCountryInfo; // This will replace the current country cards with the detailed view

            });


        });
        countries = allCountries

    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:",  error);  
    });




const selectElement = document.getElementById("filter");

selectElement.addEventListener("change", () => {
    const selectedOption = selectElement.options[selectElement.selectedIndex]; 
    const region = selectedOption.text
    const childElement = document.querySelectorAll(".countryCard")
    console.log(childElement);
    for (let i = 0; i < childElement.length; i++) {
        if (childElement[i].id !== region)
            childElement[i].style.display = 'none';

        else
            childElement[i].style.display = "block"

    }

});

//Function for the searchlist

searchList = (searchInput) => {
    const searchTerm = searchInput.value.toLowerCase();
    const listElements = document.querySelectorAll(".countryCard");

    for (let i = 0; i < listElements.length; i++) {
        const elementText = listElements[i].querySelector("h2").textContent.toLowerCase();
        if (elementText.includes(searchTerm))
            listElements[i].style.display = "block";
        else
            listElements[i].style.display = "none";

    }

}
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

    searchList(searchInput);

});

//Function for the color mode

const mode = document.getElementById("mode")
mode.addEventListener("click", () => {
    if (mode.innerText == "☾ Dark Mode") {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        mode.innerText = "☾ Light Mode";
        filter.style.backgroundColor = "white";
        filter.style.color = "black"
        searchInput.style.backgroundColor = "white"
        backButton.style.backgroundColor = "white"
        backButton.style.color = "black"

    } else {
        document.body.style.backgroundColor = "#36454F";
        document.body.style.color = "white";
        mode.innerText = "☾ Dark Mode";
        filter.style.backgroundColor = "#36454F";
        filter.style.color = "white";
        searchInput.style.backgroundColor = "#36454F";
        backButton.style.backgroundColor = "#36454F"
        backButton.style.color = "white"
    }
})