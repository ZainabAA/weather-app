const input = document.querySelector('.city-input');
const btn = document.querySelector('.btn');
const main_temp_div = document.querySelector('.main-temp');
const detail_div = document.querySelector('.detail');
const countrySelect = document.querySelector('.country-select')
const loadingPoints = document.querySelectorAll('.loading-point');

const API_KEY = '9b64af44ee3ed708f05f6e889817ea53';

document.addEventListener('keypress', (event)=>{
    if(event.key == 'Enter'){
        runQuery();
    }
});

btn.addEventListener('click', runQuery);


async function runQuery(){
    /*----reset query--------*/
    if(main_temp_div.childElementCount>0){
        main_temp_div.innerHTML = '';
        detail_div.innerHTML = '';
        loadingPoints[0].classList.toggle('animate-first');
        loadingPoints[1].classList.toggle('animate-second');
        loadingPoints[2].classList.toggle('animate-third');
        document.querySelector('.seperator').style.visibility = 'hidden';
    }

    loading(true);

    let location = input.value;
    
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);
    
    if(response.ok){
        let res = await response.json();
        loading(false);
        renderResults(res);
    }
    else{
        location = countrySelect.value;
        response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);
        if(response.ok){
            let res = await response.json();
            loading(false);
            renderResults(res);
        }
        else{
            loading(false);
            let warning = document.createElement('h1');
            warning.textContent = "Sorry, we don't have information about this country";
            main_temp_div.append(warning);
        }
    }
}

function loading(start){
    if(start){
        loadingPoints.forEach(point => {
            point.style.visibility = 'visible';
        });
        loadingPoints[0].classList.toggle('animate-first');
        loadingPoints[1].classList.toggle('animate-second');
        loadingPoints[2].classList.toggle('animate-third');
    }
    else{
        loadingPoints.forEach(point => {
            point.style.visibility = 'hidden';
        });
    }

}

function kelvinToCelsius(degree){
    return (degree - 273.15).toPrecision(3);

}

function renderResults(data){
    let temp_title = document.createElement('h3');
    let temp_text = document.createElement('p');
    let secondary_div = document.createElement('div');
    let humidity_div = document.createElement('div');
    let wind_div = document.createElement('div');
    let rain_div = document.createElement('div');


    /*-----------main-temp---------------------*/
    temp_title.textContent = 'Temperature';
    temp_text.textContent = kelvinToCelsius(data.main.temp)+'°C';

    secondary_div.classList.add('secondary-temp');

    let feels_like_div = document.createElement('div');
    let secondary_title_feels_like = document.createElement('h3');
    let secondary_text_feels_like = document.createElement('p');
    
    let min_temp_div = document.createElement('div');
    let secondary_title_min_temp = document.createElement('h3');
    let secondary_text_min_temp = document.createElement('p');

    let max_temp_div = document.createElement('div');
    let secondary_title_max_temp = document.createElement('h3');
    let secondary_text_max_temp = document.createElement('p');


    secondary_title_feels_like.textContent = 'Feels Like';
    secondary_text_feels_like.textContent = kelvinToCelsius(data.main.feels_like)+'°C';
    feels_like_div.append(secondary_title_feels_like);
    feels_like_div.append(secondary_text_feels_like);
    secondary_div.append(feels_like_div);

    secondary_title_min_temp.textContent = 'Min Temp';
    secondary_text_min_temp.textContent = kelvinToCelsius(data.main.temp_min)+'°C';
    min_temp_div.append(secondary_title_min_temp);
    min_temp_div.append(secondary_text_min_temp);
    secondary_div.append(min_temp_div);
    
    secondary_title_max_temp.textContent = 'Max Temp';
    secondary_text_max_temp.textContent = kelvinToCelsius(data.main.temp_max)+'°C';
    max_temp_div.append(secondary_title_max_temp);
    max_temp_div.append(secondary_text_max_temp);
    secondary_div.append(max_temp_div);


    main_temp_div.append(temp_title);
    main_temp_div.append(temp_text);
    main_temp_div.append(secondary_div);

    document.querySelector('.seperator').style.visibility = 'visible';
    /*-----------details---------------------*/

    let humidity_title = document.createElement('h3');
    let humidity_text = document.createElement('p');

    let wind_title = document.createElement('h3');
    let wind_text_speed = document.createElement('p');
    let wind_text_degree = document.createElement('p');

    let rain_title = document.createElement('h3');
    let rain_text = document.createElement('p');

    humidity_title.textContent = 'Humidity';
    humidity_text.textContent = data.main.humidity+ '%';
    humidity_div.append(humidity_title);
    humidity_div.append(humidity_text);

    wind_title.textContent = 'Wind';
    wind_text_speed.textContent = 'speed: '+data.wind.speed+'m/s';
    wind_text_degree.textContent = 'degree: '+data.wind.deg+' deg';
    wind_div.append(wind_title);
    wind_div.append(wind_text_speed);
    wind_div.append(wind_text_degree);

    rain_title.textContent = 'Rain';
    if(!data.rain)
        rain_text.textContent = 'no rain';
    else
        rain_text.textContent = data.rain['1h']+'mm';
    rain_div.append(rain_title);
    rain_div.append(rain_text);

    detail_div.append(humidity_div);
    detail_div.append(wind_div);
    detail_div.append(rain_div);
}