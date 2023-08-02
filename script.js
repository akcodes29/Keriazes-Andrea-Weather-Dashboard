var button = document.querySelector('.button');
var inputValue = document.querySelector('.inputValue');
var cityName = document.querySelector('.name');
var description = document.querySelector('.description');
var temperature = document.querySelector('.temperature');
var icon = document.querySelector('.icon');

var APIKey = "623456b3015ec95a9cdbd52123d09d95";
var city;



button.addEventListener('click',function(){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+inputValue.value+"&appid="+APIKey+"&units=imperial";
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
    })
    
})


// https://api.openweathermap.org/data/2.5/weather?q={inputValue}&appid={APIKey}