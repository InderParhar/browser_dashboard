const currentdate = new Date();

var data;

const date_element = document.getElementById("date_time");
const weather_element = document.getElementById("weather");

function refresh_window() {
    window.setTimeout(function () {
        window.location.reload();
    }, 30000)
}

//date and time
function update_DateTime() {
    date_element.innerHTML = "Date: " + currentdate.toLocaleDateString() + " Time: " + currentdate.toLocaleTimeString();
}

//weather
async function get_weather() {
    const response = await fetch(Weather_CONFIG.API_URL + "toronto" + "&appid=" + Weather_CONFIG.API_KEY + "&units=metric");

    data = await (response).json();
    weather_element.innerHTML = data.name + " temp: " + data.main.temp + "°c" + ", Airspace: " + data.weather[0].main;
}

//call functions
refresh_window();
update_DateTime();
get_weather();