var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var currentContainerEl = document.querySelector("#current-conditions-container");
var currentCity = document.querySelector("#weather-city");
var currentDay = moment().format(' (MM/DD/YYYY)');
var movieName = document.getElementById("container");


var formCityHandler = function (event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();

    //if the city is entered run the getCity function
    if (city) {
        getCity(city);
    } else {
        //   Get the modal
            var modal = document.getElementById("myModal");
        
        //   Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
        
        //   When the user clicks on the button, open the modal
            function noCity() {
            modal.style.display = "block";
            }
        
        //   When the user clicks on <span> (x), close the modal
            span.onclick = function() {
            modal.style.display = "none";
            }
        
        //   When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
            }
            noCity();
    };
};

// gather current city weather data and pass that data
var getCity = function (city) {
    //format the weather api url
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=55b53b07c2e560aae2f3aeb2fb43fe2f";

    // make a request to the url
    fetch(requestUrl)
        .then(function (response) {
            response.json().then(function (data) {
                displayCity(data, city);
            });
        });
};

var displayCity = function (cityInfo) {
    currentContainerEl.textContent = "";
    // display current day and city name
    
    currentCity.textContent = cityInfo.name + currentDay;

    // obtain icon, create & display image element to the page
    var source = "http://openweathermap.org/img/wn/" + cityInfo.weather[0].icon + ".png";
    var imgEl = document.createElement("img");
    imgEl.setAttribute("src", source);
    var conditionEl = document.createElement("span");
    conditionEl.appendChild(imgEl);

    // obtain temp info from api and add to page
    var cityWeather = "Temp: " + cityInfo.main.temp + "°F";
    var tempEl = document.createElement("p");
    tempEl.textContent = cityWeather;
    conditionEl.appendChild(tempEl);

    // add weather line items to page
    currentContainerEl.appendChild(conditionEl);
}

// get array of movies from API, display movies but its not working quite right
var getMovies = function (genre) {
    var genre = "Action";
    apiURL =
      "https://imdb-api.com/API/AdvancedSearch/k_65onbqrn/?title_type=feature&genres=" +
      genre;
  
    $.ajax({
      //$.curl({
      url: apiURL,
      method: "GET",
    }).done(function (response) {
      console.log(response);
      for (i = 0; i < 5; i++) {
        console.log(response.results[i].title);
        movieName.innerHTML = response.results[i].title;
      }
    });
  };

getMovies();

// submit city button event listener to trigger form submit handler
cityFormEl.addEventListener("submit", formCityHandler);




