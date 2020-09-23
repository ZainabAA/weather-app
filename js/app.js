const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const main_temp_div = document.querySelector('.main-temp');
const detail_div = document.querySelector('.detail');
const API_KEY = '9b64af44ee3ed708f05f6e889817ea53';

btn.addEventListener('click', () => {
    let location = input.value;
    console.log(input.value);
    let response = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);
    
    response.then(res =>{
        if(res.ok){
            //console.log('ok',res.status);
            res.json().then(data=>{
                console.log(data);
                renderResults(data);
            });
        }
        else {
        console.log("HTTP-Error: " +res.status);
        }
    });
    
});

function renderResults(data){
    /*-----------main-temp---------------------*/
    let secondary_div = document.createElement('div');
    secondary_div.classList.add('secondary_temp');

    let secondary_title_feels_like = document.createElement('h3');
    let secondary_text_feels_like = document.createElement('p');
    
    let secondary_title_min_temp = document.createElement('h3');
    let secondary_text_min_temp = document.createElement('p');

    let secondary_title_max_temp = document.createElement('h3');
    let secondary_text_max_temp = document.createElement('p');


    secondary_title_feels_like.textContent = 'Feels Like';
    secondary_text_feels_like.textContent = data.main.feels_like;
    secondary_div.append(secondary_title_feels_like);
    secondary_div.append(secondary_text_feels_like);

    secondary_title_min_temp.textContent = 'Min Temp';
    secondary_text_min_temp.textContent = data.main.temp_min;
    secondary_div.append(secondary_title_min_temp);
    secondary_div.append(secondary_text_min_temp);
    
    secondary_title_max_temp.textContent = 'Max Temp';
    secondary_text_max_temp.textContent = data.main.temp_max;
    secondary_div.append(secondary_title_max_temp);
    secondary_div.append(secondary_text_max_temp);


    main_temp_div.style.visibility = 'visible';
    main_temp_div.append(data.main.temp);
    main_temp_div.append(secondary_div);

    /*-----------details---------------------*/
    let humidity_div = document.createElement('div');
    let wind_div = document.createElement('div');
    let rain_div = document.createElement('div');

    let humidity_title = document.createElement('h3');
    let humidity_text = document.createElement('p');

    let wind_title = document.createElement('h3');
    let wind_text_speed = document.createElement('p');
    let wind_text_degree = document.createElement('p');

    let rain_title = document.createElement('h3');
    let rain_text = document.createElement('p');

    humidity_title.textContent = 'Humidity';
    humidity_text.textContent = data.main.humidity;
    humidity_div.append(humidity_title);
    humidity_div.append(humidity_text);

    wind_title.textContent = 'Wind';
    wind_text_speed.textContent = 'speed: '+data.wind.speed;
    wind_text_degree.textContent = 'degree: '+data.wind.deg;
    wind_div.append(wind_title);
    wind_div.append(wind_text_speed);
    wind_div.append(wind_text_degree);

    rain_title.textContent = 'Rain';
    rain_text.textContent = data.rain['1h'];
    rain_div.append(rain_title);
    rain_div.append(rain_text);

    detail_div.append(humidity_div);
    detail_div.append(wind_div);
    detail_div.append(rain_div);
}