fetch('https://ipapi.co/json/')
  .then(response => response.json())
  .then(data => {
    const city = document.querySelectorAll('.city');
    setInterval(function() {
      getMeteoByCity(data.city);
    }, 60000);
    for(const element of city){
      element.textContent = data.city
    } 
    console.log(data)
});

function getTime(element){
  setInterval(() => {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let secondes = date.getSeconds();

    hour = hour < 10 ? "0" + hour : hour;
    minutes < 10 ? minutes = '0'+ minutes : minutes;
    secondes < 10 ? secondes = '0'+ secondes : secondes;

    element.textContent =  hour + " : " + minutes + " : " + secondes;
  })  
}
 
function getDate(element){

  // let options = { 
  //   weekday: 'long',
  //   year: 'numeric', 
  //   month: 'long', 
  //   day: 'numeric' 
  // };
  let date = new Date();

  let weekday = date.toLocaleString('fr-FR', {weekday: 'long'});
  weekday = weekday.replace(weekday.charAt(0), weekday.charAt(0).toUpperCase())
  let year = date.getFullYear();
  let month = date.toLocaleString('fr-FR', {month: 'long'});
  let day = date.getDate();

  // let fr = new Intl.DateTimeFormat('fr-FR', options).format(date);
  // console.log(fr);
  // let frUppercase = fr.replace(fr.charAt(0), fr.charAt(0).toUpperCase());
  // element.textContent = frUppercase;
  element.innerHTML = "<div>" + weekday + "</div><div>" + day + " " + month + " " + year + "</div>";
}

const date = document.querySelector('.date');
getDate(date)
const time = document.querySelector('.time');
getTime(time)

function getMeteoByCity(city){
  const KEY = '30d3c028a4d92a2f368b10c547bdb5e3';
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`)
  .then(response => response.json())
  .then(data =>{
    const temKelvin = data.main.temp;
    const temparature = (temKelvin - 273.15).toFixed(2)
    console.log(data.weather[0].main)

    document.querySelector('.temp').textContent = temparature + ' °C' ;
    document.querySelector('.hum').textContent = 'Humidité: '+ data.main.humidity + '%';
    const weatherImg = document.querySelector('.weather-img img')

    switch(data.weather[0].main){
      case 'Rain' :
        weatherImg.src = 'images/rain.png';
        break;
      case 'Clouds':
        weatherImg.src = 'images/cloud.png';
        break;
      case 'Clear':
        weatherImg.src = 'images/clear.png';
        break;
      case 'Snow':
        weatherImg.src = 'images/snow.png';
        break;
      case 'Haze':
        weatherImg.src = 'images/mist.png';
        break;
      default:
        weatherImg.src = '';

    }
  });
}

  

