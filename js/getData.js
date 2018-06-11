const APIKEY = 'f6ca47399124cfa87c537ac81d7517a2';
let inputCity = $('#city');
let city = "";
let currentWeather = {};

class Weather {
    constructor(city, minT, maxT, meanT, sky, wind, backgroundUrl) {
        this.city = city;
        this.minT = minT;
        this.maxT = maxT;
        this.meanT = meanT;
        this.sky = sky;
        this.wind = wind;
        this.backgroundUrl = backgroundUrl;
    }
    showMessage() {
        $('.weatherBox__showInfo').html('<div class="weatherBox__showInfo--box"> <h3>Currently weather in ' + this.city + ' : </h3></div>')
    }
    showMin() {
        $('.weatherBox__showInfo--box').append('<div class="weatherBox__showInfo--data"> Min temperature is ' + this.minT + '°C</div>')
    }
    showMax() {
        $('.weatherBox__showInfo--box').append('<div class="weatherBox__showInfo--data"> Max temperature is ' + this.maxT + '°C</div>')
    }
    showMean() {
        $('.weatherBox__showInfo--box').append('<div class="weatherBox__showInfo--data"> Average is ' + this.meanT + '°C</div>')
    }
    showMain() {
        $('.weatherBox__showInfo--box').append('<div class="weatherBox__showInfo--data"> There is ' + this.sky + ', wind: ' + this.wind + 'm/s.</div>')
    }

    showMode() {
        $('.weatherBox__showInfo').slideUp('fast');
        setTimeout(() => {
            this.showMessage();
            this.showMin();
            this.showMax();
            this.showMean();
            this.showMain();
            $('.weatherBox__showInfo').slideDown('normal');
            $('.weatherBox__showInfo--box').append('<button class="weatherBox__btn" onClick="clear()">Close</button>')
            $('.weatherBox__showInfo--box').css('background', 'url(https://openweathermap.org/img/w/' + this.backgroundUrl + '.png)no-repeat 5%');

        }, 500)

    }
};

inputCity.on('input', () => city = inputCity.val());

function loadData() {

    $.ajax({
        url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${APIKEY}`,
        type: 'get',
        dataType: 'json',
        success: function (response) {

            currentWeather = new Weather(response.name, response.main.temp_min, response.main.temp_max, response.main.temp, response.weather[0].description, response.wind.speed, response.weather[0].icon)
            currentWeather.showMode();

        },
        error: function () {
            error();
        }
    })
};

function clear() {
    $('.weatherBox__showInfo').html('')
}
function error() {
    $('.weatherBox__showInfo').html('<div class="weatherBox__showInfo--box"> <h3>Write corect english city name</h3></div>').slideDown('slow')
    $('#getData').html('Try again');

}

$('#getData').on('click', () => {
    loadData();
    $('#getData').html('Next city');
});

$('.weatherBox__showInfo').last().on('click', () => {
    $('.weatherBox__showInfo').slideUp('slow');
    clear();
});
