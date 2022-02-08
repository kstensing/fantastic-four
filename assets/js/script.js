var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var currentContainerEl = document.querySelector("#current-conditions-container");
var currentCity = document.querySelector("#weather-city");
var currentDay = moment().format(' (MM/DD/YYYY)');
var movieName = document.getElementById("movie-suggestions");


var formCityHandler = function (event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();

    //if the city is entered run the getCity function
    if (city) {
        getCity(city);
    } 
    if (city === false) {
        invalidCity();
    }
    else {
        invalidCity();
    };
    
    function invalidCity () {
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
    }
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
                Categories(data);
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
      "https://imdb-api.com/API/AdvancedSearch/k_01ol8p7k/?title_type=feature&genres=" +
      genre;
  
    $.ajax({
      //$.curl({
      url: apiURL,
      method: "GET",
    }).done(function (response) {
      console.log(response);
      for (i = 0; i < 5; i++) {
        console.log(response.results[i].title);
        // I commented out this way of adding it to the page in order to test the movieEl for each movie functionality below
        //movieName.innerHTML = response.results[i].title;
        
        // displays each movie on the screen as a list element ***Need to test checkbox functionality that's why it's commented out
        var movieEl = document.createElement("li");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList = "checkbox mx-3";
        checkbox.value = 1;
        checkbox.name = "Save to Favorites"
        movieEl.classList = "suggestions";
        movieEl.textContent = response.results[i].title;
        movieEl.appendChild(checkbox);
        movieName.appendChild(movieEl);
      }
    });
  };

getMovies();

// submit city button event listener to trigger form submit handler
cityFormEl.addEventListener("submit", formCityHandler);


//categorize weather types
var Categories = function (data) {
    //console.log(data);
    var icon = data.weather[0].icon;
    if (icon == "01d" || icon == "01n" || icon == "02d" || icon == "02n") {
        var weatherCategory = "sunny";
    }
    else if (icon == "03d" || icon == "03n" || icon == "04d" || icon == "04n") {
        var weatherCategory = "cloudy";
    }
    else if (icon == "09d" || icon == "09n" || icon == "10d" || icon == "10n") {
        var weatherCategory = "rainy";
    }
    else if (icon == "11d" || icon == "11n") {
        var weatherCategory = "stormy";
    }
    else if (icon == "13d" || icon == "13n") {
        var weatherCategory = "snowy";
    }
    else if (icon == "50d" || icon == "50n") {
        var weatherCategory = "misty";
    }
    console.log(weatherCategory);
};

