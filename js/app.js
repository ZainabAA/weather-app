const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const main_temp_div = document.querySelector('.main-temp');
const detail_div = document.querySelector('.detail');

const API_KEY = '9b64af44ee3ed708f05f6e889817ea53';

btn.addEventListener('click', () => {
    /*----new query--------*/
    if(main_temp_div.childElementCount>0){
        main_temp_div.innerHTML = '';
        detail_div.innerHTML = '';
    }

    // console.log(main_temp_div);

    let location = input.value;
    //console.log(input.value);
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
    let temp_title = document.createElement('h3');
    let temp_text = document.createElement('p');
    let secondary_div = document.createElement('div');
    let humidity_div = document.createElement('div');
    let wind_div = document.createElement('div');
    let rain_div = document.createElement('div');


    /*-----------main-temp---------------------*/
    temp_title.textContent = 'Temperature';
    temp_text.textContent = data.main.temp;

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
    secondary_text_feels_like.textContent = data.main.feels_like;
    feels_like_div.append(secondary_title_feels_like);
    feels_like_div.append(secondary_text_feels_like);
    secondary_div.append(feels_like_div);

    secondary_title_min_temp.textContent = 'Min Temp';
    secondary_text_min_temp.textContent = data.main.temp_min;
    min_temp_div.append(secondary_title_min_temp);
    min_temp_div.append(secondary_text_min_temp);
    secondary_div.append(min_temp_div);
    
    secondary_title_max_temp.textContent = 'Max Temp';
    secondary_text_max_temp.textContent = data.main.temp_max;
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
    if(!data.rain)
        rain_text.textContent = 'no rain';
    else
        rain_text.textContent = data.rain['1h'];
    rain_div.append(rain_title);
    rain_div.append(rain_text);

    detail_div.append(humidity_div);
    detail_div.append(wind_div);
    detail_div.append(rain_div);
}