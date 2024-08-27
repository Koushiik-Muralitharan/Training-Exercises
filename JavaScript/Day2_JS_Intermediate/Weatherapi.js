const API_KEY = "7d3bf8ad01e8bf2375ca7989b24980c2";
    const URL = 'https://api.openweathermap.org/data/2.5/weather';
    const getWeatherData = async (city) => {
      try {
        const fullUrl = `${URL}?q=${city}&appid=${API_KEY}&units=imperial`;
        const response = await fetch(fullUrl);
        if (!response.ok) {
          console.log("Failed to fetch weather data");
          document.getElementById('error-display').textContent = "Please enter a valid city name."
        }else{
          document.getElementById('error-display').textContent = "";
          const weatherData = await response.json();
        return weatherData;
        }
        
      } catch (error) {
        console.log(error);
        return null;
      }
    };

    const searchCity = async () => {
      const city = document.getElementById('input-field').value.trim();
      if(city === ""){
        document.getElementById('error-display').textContent = "Please enter a city name to search."
      }
      if (city) {
        const weatherData = await getWeatherData(city);
        if (weatherData) {
          showWeatherData(weatherData);
          console.log(weatherData);
        } else {
          console.log("Could not retrieve weather data");
        }
      }
    };

    const showWeatherData = (weatherData) => {
     let icon=weatherData.weather[0].icon;
      document.getElementById('city-name').innerText = weatherData.name;
      document.getElementById('temperature').innerText = weatherData.main.temp;
      document.getElementById('humidity').innerText = weatherData.main.humidity;
      document.getElementById('icon').src =  `https://openweathermap.org/img/wn/${icon}@2x.png`
    };    
    document.getElementById('search-city').addEventListener('click', searchCity);