const iceTemp = "background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);";
const coldTemp = "background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);";
const warmTemp = "background-image: linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%);";
const hotTemp = "background-image: linear-gradient(to top, #f43b47 0%, #453a94 100%);";
const rainy = "background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);";

const tempContainer = document.querySelector('.temp-text');
const tempContainerMoreInfo = document.querySelector('.temp-more-info');
const tempLocationContainer = document.querySelector('.temp-location');

const btn = document.querySelector('.toggle-temp');

const tempUnit = "C";

const fahrenheitContainer = document.querySelector('.temp-text-fahrenheit');
const wrapper = document.querySelector('.wrapper');


var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
  
function success(pos) {
  var crd = pos.coords;
  const long = crd.longitude;
  const lat = crd.latitude;
  showWeather(long, lat);
}

navigator.geolocation.getCurrentPosition(success, error, options);

async function getWeather(long, lat) {
    const res = await fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`);
    const data = await res.json();
    return data;
}

async function showWeather(long, lat) {
    const weather = await getWeather(long, lat);
    console.log(weather);
    let currentTemp = weather.main.temp;
    if (weather) {
        tempContainer.innerHTML = `${Math.round(currentTemp)}&deg;${tempUnit}`;
        tempLocationContainer.innerHTML = `${weather.name}, ${weather.sys.country}`;
        tempContainerMoreInfo.innerHTML = `${weather.weather[0].description}`;
        backgroundChange();
    }

};

function unitChange() {
  if (btn.innerHTML.charAt(0) == "F") {
    tempContainer.classList.add("hs");
    fahrenheitContainer.innerHTML = `${parseInt(tempContainer.innerHTML) * 9/5 + 32}&deg;F`;
    fahrenheitContainer.classList.remove("hs");
    btn.innerHTML = "Celsius";
  } else if (btn.innerHTML.charAt(0) == "C") {
    fahrenheitContainer.classList.add("hs");
    tempContainer.classList.remove("hs");
    btn.innerHTML = "Fahrenheit";
  }
}

btn.addEventListener('click', unitChange);

function backgroundChange() {
  if(parseInt(tempContainer.innerHTML) < 4) {
    wrapper.style = iceTemp;
  } else if (parseInt(tempContainer.innerHTML) < 15) {
    wrapper.style = coldTemp;
  } else if (parseInt(tempContainer.innerHTML) < 20) {
    wrapper.style = warmTemp;
  } else if (parseInt(tempContainer.innerHTML) > 20) {
    wrapper.style = hotTemp;
  }
}