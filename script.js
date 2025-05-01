const currentdate = new Date();

var data;
var latitude;
var longitude;

const date_element = document.getElementById("date_time");
const weather_element = document.getElementById("weather");
const news_element = document.getElementById("news");
const currency_element = document.getElementById("currency");
const quotes_element = document.getElementById("quote_details");

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

//news
async function get_NEWS() {
    const response = await fetch(NEWS_CONFIG.API_URL + NEWS_CONFIG.API_KEY + "&q=canada&language=en");

    data = await response.json();

    if (data.status === 'success') {

        news_element.innerHTML = `<p> ${data.results[0].title}<p><br>
                                    <p> ${data.results[1].title} <p><br>
                                    <p> ${data.results[2].title}<p>`;
    }
    else {
        console.log("Try Again");
    }
}

//currency
async function get_currencyRates() {
    const response = await fetch(CURRENCY_CONFIG.API_URL + CURRENCY_CONFIG.API_KEY + "/pair/USD/INR");
    data = await response.json();

    if (data.result === 'success') {
        currency_element.innerHTML = "Conversion rates: 1 " + data.base_code + " = " + data.conversion_rate + " " + data.target_code + ".";
    }
    else {
        consolse.log("Failed, try again");
    }
}

async function get_quotes() {
    const response = await fetch(QUOTES_CONFIG.API_URL, {
        method: 'GET',
        headers: {
            'X-Api-Key': QUOTES_CONFIG.API_KEY
        }
    });
    data = await response.json();

    // quotes_element.innerHTML = '"' + data[0].quote + '"';
    quotes_element.innerHTML = `<p> ${data[0].quote} <p> <br>
                                <p> ${data[0].author}<p>`
}

function getlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(assign_coords);
    }
    else {
        console.log("Does not exist");
    }
}

function assign_coords(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}

async function get_address(){
    response = await fetch (GOOGLE_MAPS_CONFIG.REVERSE_GEO_API_URL+"latlng="+latitude+","+longitude+"&key="+GOOGLE_MAPS_CONFIG.API_KEY);
    data = await response.json();

    console.log(data);
}


//call functions
update_DateTime();
get_weather();
get_NEWS();
get_currencyRates();
get_quotes();
// refresh_window();
