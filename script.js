const weatherForm = document.querySelector(".weatherForm"); 
const cityInput = document.querySelector(".cityInput"); 
const cards = document.querySelector(".card"); 
const apiKey ="a629ec6648d326a59a10a1e7e666087a";

weatherForm.addEventListener("submit", async event=>{ 
    event.preventDefault(); 
    const city = cityInput.value; 
    if(city){ 
        try{ 
            const weatherData = await getWeatherData(city); 
            displayWeatherData(weatherData); 
        } 
        catch(error){ 
            console.error(error); 
            displayError(error); 
        } 
    } else{ 
        displayError("Please enter a city") 
    } 
}); 
async function getWeatherData(city){ 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; 
    const response = await fetch(apiUrl); 
    // console.log(response); 
    // if(!response.ok){ 
    // throw new Error("Error couldn't fetch data") 
    // } 
    return await response.json(); 
} 
function displayWeatherData(data){ 
    const {name:city, 
        main:{temp}, 
        weather:[{description,id}]} = data; 
        cards.textContent=""; 
        cards.style.display = "flex"; 
        const cityDisplay = document.createElement("h1"); 
        const tempDisplay = document.createElement("p"); 
        const descDisplay = document.createElement("p"); 
        const emojiDisplay = document.createElement("p")
        ; 
        cityDisplay.textContent = city; 
        tempDisplay.textContent = `${(temp-273.15).toFixed(1)}°C`; 
        descDisplay.textContent = description; 
        emojiDisplay.textContent = getEmojiDisplay(id)
        ; 
        cityDisplay.classList.add("cityDisplay"); 
        tempDisplay.classList.add("tempDisplay");
        descDisplay.classList.add("descDisplay"); 
        emojiDisplay.classList.add("emojiDisplay");

        cards.appendChild(cityDisplay); 
        cards.appendChild(tempDisplay); 
        cards.appendChild(descDisplay); 
        cards.appendChild(emojiDisplay); 
} 
function getEmojiDisplay(weatherId){ 
    switch(true){ 
        case (weatherId >= 200 && weatherId <300): 
        return "⛈️"; 
        case (weatherId >= 300 && weatherId <400): 
        return "🌧️"; 
        case (weatherId >= 500 && weatherId <600): 
        return "🌧️"; 
        case (weatherId >= 600 && weatherId <700): 
        return "❄️"; 
        case (weatherId >= 700 && weatherId <800): 
        return "🌫️"; 
        case (weatherId ===800): 
        return "☀️"; 
        case (weatherId >= 801 && weatherId <810): 
        return "☁️"; 
        default: 
        return "-"; 
    } 
} function displayError(message){ 
    const errorDisplay = document.createElement("p"); 
    errorDisplay.textContent =message; 
    errorDisplay.classList.add("errorDisplay"); 
    cards.textContent=""; 
    cards.style.display="flex"; 
    cards.appendChild(errorDisplay); 
}