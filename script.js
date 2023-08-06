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
var weatherForecast = document.getElementById('weatherForecast');


var APIKey = "623456b3015ec95a9cdbd52123d09d95";
var city;



button.addEventListener('click',function(){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+inputValue.value+"&appid="+APIKey+"&units=imperial"+"&wind=imperial";
    fetch(queryURL)
    .then(response => {
        console.log(response)
        return response.json();
    })
    .then(data => {
        console.log(data);
        temperature.innerHTML = "Temperature: " + data.main.temp + " F";
        cityName.innerHTML = data.name;
        icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        wind.innerHTML = "Wind: " + data.wind.speed + " MPH";
        humidity.innerHTML = "Humidity: " + data.main.humidity + " %";
        weatherForecast(data.coord);
        

    });
   
    var reformatDate = dayjs().format('dddd, MMMM D, YYYY h:mm A');
    $('#date').text(reformatDate); 

    

    


    
function weatherForecast(coord) {
    let {lat, lon } = coord;
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
           const day1 = data.list[7];
            const day2 = data.list[15];
            const day3 = data.list[23];
            const day4 = data.list[31];
            const day5 = data.list[39];
            
            console.log(day1);

           const dayArray= [day1, day2, day3, day4, day5]; 
            showWeatherForecastData(dayArray);

        });
}

function showWeatherForecastData(data){
    console.log("testing", data);
    data.forEach(day => {
        console.log(day);


        //create the element
        const divContainer = document.createElement("div");
        const icons = document.createElement('img');
        const temp = document.createElement("p");
        const wind = document.createElement("p");
        const humidity = document.createElement("p");

        
        //append to the page
        fiveday.append(divContainer);
        divContainer.append(icons);
        divContainer.append(temp);
        divContainer.append(wind);
        divContainer.append(humidity);
        
        //give it some content
        temp.textContent = "Temp: " + day.main.temp + " F";
        wind.textContent = "Wind: " + day.wind.speed + " MPH";
        humidity.textContent = "Humidity: " + day.main.humidity + " %";

        icons.setAttribute('src', `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`);


        //add styling
        temp.classList.add("temp");
        wind.classList.add("wind");
        humidity.classList.add("humidity");
        divContainer.classList.add("weatherForecast");

         
    });
}




});