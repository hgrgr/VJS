const weather = document.querySelector(".js-weather");
const API_KEY = "1e4c33f415c08118a26c507e3e240f5f";
const COORDS = 'coords';

//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
function getWeather(lat,lng)
{
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
    ).then(function(response)
    {
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    })
}
function saveCoords(coordsObj)
{
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}
function handleGeoErro()
{

}
function handleGeoSucces(position)
{
   const latitude = position.coords.latitude;
   const longitude = position.coords.longitude;

   const coordsObj ={
       latitude,
       longitude
   }
   saveCoords(coordsObj);
   getWeather(latitude,longitude);
}
  
function askForCoors()
{
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoErro)
}
  
function loadCoords()
{
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords ===null)
    {
        askForCoors();
    }
    else
    {
        const parseCoords = JSON.parse(loadedCords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init()
{
    loadCoords();
}

init();