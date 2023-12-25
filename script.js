// https://api.openweathermap.org/data/2.5/weather?q=Bhiwandi&appid=123395d9504e07775d5f6f3ecd37d279&units=metric

const searchButton = document.querySelector('button');
const searchText = document.getElementById('searchtext');
const Image = document.getElementById('image');

searchButton.addEventListener('click', () => {
    const location = searchText.value.trim();
    if (location !== '') {
        fetchWeather(location);
    }
});

async function fetchWeather(location) {
    try {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=123395d9504e07775d5f6f3ecd37d279&units=metric`);
        let data = await res.json();
        console.log(data);

        if (data.cod === '404') {
            document.querySelectorAll('.temp, .city, .details').forEach(element => {
                element.classList.add('hidden');
            });
            document.querySelector('.city').classList.remove('hidden');
            Image.src ="images/nolocation.png"
            document.querySelector('.city').innerHTML = "No Location Found"; 
            // alert('City not found. Please enter a valid city.'); 
        } 
        
        else {
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";
        document.querySelector('.humidity').innerHTML = data.main.humidity + " %";
        switch (data.weather[0].main) {
            case 'Clear':
                Image.src = "images/clear.png";
                break;
            case 'Clouds':
                Image.src = "images/clouds.png";
                break;
            case 'Drizzle':
                Image.src = "images/drizzle.png";
                break;
            case 'Rain':
                Image.src = "images/rain.png";
                break;
            case 'Snow':
                Image.src = "images/snow.png";
                break;
            case 'Thunderstorm':
                Image.src = "images/thunderstorm.png";
                break;
            default:
                Image.src = "images/nolocation.png";
                break;
        }
        
        document.querySelectorAll('.temp, .city, .details').forEach(element => {
            element.classList.remove('hidden');
        });
        }
    }catch (error) {
    console.error('Error fetching weather data:', error);
    }
}
