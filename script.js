const currentdate = new Date();

var data;
var latitude;
var longitude;

var location_country_name;
var location_country_code;
var location_city;
var location_region;


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
    const response = await fetch(Weather_CONFIG.API_URL + location_city + "," + location_country_code + "&appid=" + Weather_CONFIG.API_KEY + "&units=metric");

    data = await (response).json();
    weather_element.innerHTML = data.name + ", " + data.sys.country + " Temp: " + data.main.temp + "°c" + ", Airspace: " + data.weather[0].main;
}

//news
async function get_NEWS() {
    const response = await fetch(NEWS_CONFIG.API_URL +location_country_code.toLowerCase() + "&apikey=" + NEWS_CONFIG.API_KEY);

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
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            //TODO: try using promise instead of calling it here
            get_address();
        });
    }
    else {
        console.log("Does not exist");
    }
}

async function get_address() {
    response = await fetch(GOOGLE_MAPS_CONFIG.REVERSE_GEO_API_URL + "latlng=" + latitude + "," + longitude + "&key=" + GOOGLE_MAPS_CONFIG.API_KEY);
    data = await response.json();

    //TODO: try the same with an helper function
    if (data.status === 'OK') {
        for (var i = 0; i < data.results[0].address_components.length; i++) {
            for (var j = 0; j < data.results[0].address_components[i].types.length; j++) {
                if (data.results[0].address_components[i].types[j] === 'country') {
                    location_country_name = data.results[0].address_components[i].long_name;
                    location_country_code = data.results[0].address_components[i].short_name;
                }
                if (data.results[0].address_components[i].types[j] === 'administrative_area_level_3') {
                    location_city = data.results[0].address_components[i].long_name;
                }
                if (data.results[0].address_components[i].types[j] === 'administrative_area_level_1') {
                    location_region = data.results[0].address_components[i].long_name;
                }
            }
        }

        get_weather();
        get_NEWS();
    }
    else {
        alert("Got no resposne");
    }
    console.log(location_city);
}

//call functions
update_DateTime();
get_currencyRates();
get_quotes();