window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';


      var api = 'https://api.darksky.net/forecast/4515d83c98cbff392bb71be46f135a75/';
      api = proxy + api;
      api = api + lat + ',' + long
      fetch(api).then(response => {
        return response.json();
      }).then(data => {
        const {
          temperature,
          summary,
          icon
        } = data.currently;
        //set DOM elements from the API
        let celcius = (temperature - 32) * (5 / 9);
        temperatureDegree.textContent = temperature;
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone;
        temperatureDegree.textContent = Math.floor(celcius);
        temperatureSpan.textContent = "C";
        //set icon
        setIcons(icon, document.querySelector('.icon'));

        //Change temperature to Celcius/Faernheit
        temperatureSection.addEventListener('click', () => {
          if (temperatureSpan == "F") {
            temperatureSpan.textContent = "C";
            temperatureDegree.textContent = Math.floor(celcius);
          } else {
            temperatureSpan.textContent = "F";
            temperatureDegree.textContent = temperature;
          }
        })

      })
    })

  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({
      color: 'white'
    });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});