var button = document.querySelector('.button');
var inputValue = document.querySelector('.inputValue');
var cityName = document.querySelector('.name');
var description = document.querySelector('.description');
var temperature = document.querySelector('.temperature');
var icon = document.querySelector('.icon');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');

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
        console.log(data)
        temperature.innerHTML = data.main.temp
        cityName.innerHTML = data.name
        icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        wind.innerHTML = data.wind.speed
        humidity.innerHTML = data.main.humidity

    })
   
    var reformatDate = dayjs().format('dddd, MMMM D, YYYY h:mm A');
    $('#date').text(reformatDate); 


    weatherForecast()
function weatherForecast() {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        let {latitude, longitude } = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}`)
        .then(response => {
            console.log(response)
            return response.json();
        })
        .then(data => {
            console.log(data)
            showWeatherForecastData(data);
        })
    })
}

function showWeatherForecastData(data){
    let {temperature, humidity, wind} = data. ;
}
        
})





// var fiveDay = "http://api.openweathermap.org/data/2.5/forecast?lat="+{lat}&lon={lon}+"&appid="+{APIKey};

// https://api.openweathermap.org/data/2.5/weather?q={inputValue}&appid={APIKey}