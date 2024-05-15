var button = document.querySelector('.button');
var inputValue = document.querySelector('.inputValue');
var cityName = document.querySelector('.name');
var description = document.querySelector('.description');
var temperature = document.querySelector('.temperature');
var icon = document.querySelector('.icon');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
var fiveday = document.querySelector('.fiveday');
var date = document.getElementById('date');
var time = document.getElementById('time');

//API Key
var APIKey = "623456b3015ec95a9cdbd52123d09d95";

//localStorage
var city= '';
var citySearch = JSON.parse(localStorage.getItem("citySearch"))||[];
var previousSearch = document.querySelector("#previousSearch")


function prevCities(){
    var savedCities = JSON.parse(localStorage.getItem('citySearch'));

    if(savedCities !== null) {
        citySearch = savedCities;
    }
    prevCityBtns();
}

function saveCity(){
    localStorage.setItem('citySearch', JSON.stringify(citySearch));
}

function prevCityBtns(){
    previousSearch.innerHTML = '';
    if(citySearch == null) {
        return;
    }
    
        for(var i=0; i< citySearch.length; i++){
            var cityName = citySearch[i];
            var btnEl = document.createElement('button');
            btnEl.textContent = cityName;
            btnEl.setAttribute('class', 'listbtn');
            
           //Add an event listener to the button
           btnEl.addEventListener('click', function(){
                displayWeather(cityName);
            });

            previousSearch.appendChild(btnEl);
            prevCityClick();
        }
    }
    
function prevCityClick(){
    $('.listbtn').on('click', function(event) {
                event.preventDefault();
                city = $(this).text().trim();
                APIcall(city);
            })
        }

const localStorageContent = localStorage.getItem('citySearch');
const input = document.querySelector("input"),
        btn = document.querySelector(".listbtn");

//Current Day Function
function APIcall(city) {
    var queryURL = 
        "https://api.openweathermap.org/data/2.5/weather?q=" +
         city + 
        '&appid=' +
        APIKey + 
        '&units=imperial';
    fetch(queryURL)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        var reformatDate = dayjs.unix(data.dt).format('dddd, MMMM D, YYYY h:mm A');
        temperature.innerHTML = " " + Math.round(data.main.temp) + '°F';
        cityName.innerHTML = data.name;
        icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        wind.innerHTML = "Wind: " + data.wind.speed + ' MPH';
        humidity.innerHTML = "Humidity: " + data.main.humidity + '%';
        weatherForecast(data.coord);

        if(!citySearch.includes(input.value)){
            citySearch.push(input.value);
        }
        if(citySearch.length > 5) {
             citySearch.shift()     
        }
        localStorage.setItem('citySearch', JSON.stringify(citySearch));
        prevCityBtns();

    });
}

//Display Current and 5 Day
button.addEventListener('click',function(){
    document.querySelector(".currentDisplay").style.display = "block"
    document.querySelector("#fiveFore").style.display = "block"
    APIcall(inputValue.value)
         
    });
   
//Current Date
    var reformatDate = dayjs().format(' MMMM D, YYYY');
    $('#date').text(reformatDate); 

//5 Day Forecast Function 
function weatherForecast(coord) {
    let {lat, lon } = coord;
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
           const day1 = data.list[7];
            const day2 = data.list[15];
            const day3 = data.list[23];
            const day4 = data.list[31];
            const day5 = data.list[39];

        //Array    
           const dayArray= [day1, day2, day3, day4, day5]; 
            showWeatherForecastData(dayArray);
        });
}

function showWeatherForecastData(data){
    document.querySelector(".fiveday").innerHTML = ""
    data.forEach(day => {

        //create the element
        const divContainer = document.createElement("div");
        const icons = document.createElement('img');
        const temp = document.createElement("p");
        const wind = document.createElement("p");
        const humidity = document.createElement("p");
       const date = document.createElement("p");

        //append to the page
        fiveday.append(divContainer);
        divContainer.append(date);
        divContainer.append(icons);
        divContainer.append(temp);
        divContainer.append(wind);
        divContainer.append(humidity);
        
        //give it some content
        var month = day.dt_txt.substring(5, 7);
        var dt = day.dt_txt.substring(8, 10);
        var year = day.dt_txt.substring(0, 4);
        var d = month + "/" + dt + "/" + year 
        date.textContent = d;
        temp.textContent = " " + Math.round(day.main.temp) + "°F";
    
        wind.textContent = "Wind: " + day.wind.speed + " MPH";
        humidity.textContent = "Humidity: " + day.main.humidity + "%";

        icons.setAttribute('src', `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`);

        //add styling
        temp.classList.add("temp");
        wind.classList.add("wind");
        humidity.classList.add("humidity");
        divContainer.classList.add("weatherForecast");     
    });
}

