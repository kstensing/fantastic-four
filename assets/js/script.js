var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var currentContainerEl = document.querySelector(
  "#current-conditions-container"
);
var currentCity = document.querySelector("#weather-city");
var currentDay = moment().format(" (MM/DD/YYYY)");
var movieName = document.getElementById("movie-suggestions");

var formCityHandler = function (event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  getCity(city);
};

function displayFavorites() {
  document.querySelector("#favorites-container").innerHTML = "";
  for (
    let i = 0;
    i < JSON.parse(localStorage.getItem("favorites")).length;
    i++
  ) {
    var favoritesList = JSON.parse(localStorage.getItem("favorites"))[i];
    let favoriteEl = document.createElement("li");
    favoriteEl.classList = "favorite-item";
    favoriteEl.textContent = favoritesList;
    document.getElementById("favorites-container").appendChild(favoriteEl);
  }
}
// gather current city weather data and pass that data
var getCity = function (city) {
  //format the weather api url
  var requestUrl = " https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=55b53b07c2e560aae2f3aeb2fb43fe2f";    function invalidCity () {
      //   Get the modal
      var modal = document.getElementById("myModal");        //   Get the <span> element that closes the modal
          var span = document.getElementsByClassName("close")[0];        //   When the user clicks on the button, open the modal
          function noCity() {
          modal.style.display = "block";
          }        //   When the user clicks on <span> (x), close the modal
          span.onclick = function() {
          modal.style.display = "none";
          }        //   When the user clicks anywhere outside of the modal, close it
          window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
          }
          noCity();
  }
  // make a request to the url
  fetch(requestUrl)
      .then(function (response) {
          if (response.ok){
          response.json().then(function (data) {
              displayCity(data);
          });
      }
          else {
              invalidCity();
          }
      })
      .catch(function () {
          invalidCity();
      })
};

var displayCity = function (cityInfo) {
  currentContainerEl.textContent = "";
  // display current day and city name

  currentCity.textContent = cityInfo.name + currentDay;

  // obtain icon, create & display image element to the page
  var source =
    "http://openweathermap.org/img/wn/" + cityInfo.weather[0].icon + ".png";
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

  var weatherCategory = "";
  var icon = cityInfo.weather[0].icon;
  if (icon == "01d" || icon == "01n" || icon == "02d" || icon == "02n") {
    var weatherCategory = "comedy,adventure,animation";
  } else if (icon == "03d" || icon == "03n" || icon == "04d" || icon == "04n") {
    var weatherCategory = "superhero,mystery";
  } else if (icon == "09d" || icon == "09n" || icon == "10d" || icon == "10n") {
    var weatherCategory = "drama,romance";
  } else if (icon == "11d" || icon == "11n") {
    var weatherCategory = "horror,crime";
  } else if (icon == "13d" || icon == "13n") {
    var weatherCategory = "animation,superhero";
  } else if (icon == "50d" || icon == "50n") {
    var weatherCategory = "horror,thriller,fantasy,sci-Fi,mystery";
  } else {
    var weatherCategory = "family";
  }

  getMovies(weatherCategory);
};

// get array of movies from API, display movies but its not working quite right
var getMovies = function (genre) {
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

      // displays each movie on the screen as a list element ***Need to test checkbox functionality that's why it's commented out
      let movieEl = document.createElement("li");
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList = "checkbox mx-3";
      checkbox.value = 1;
      checkbox.name = "Save to Favorites";
      movieEl.classList = "suggestions has-text-justified";
      movieEl.textContent = response.results[i].title;
      
      
      movieEl.prepend(checkbox);
      movieName.appendChild(movieEl);
      checkbox.addEventListener("click", function (event) {
        console.log(event.target.checked);
        let favoritesArray =
          localStorage.getItem("favorites") === null
            ? []
            : JSON.parse(localStorage.getItem("favorites"));
        if (event.target.checked) {
          if (!favoritesArray.includes(movieEl.textContent)) {
            favoritesArray.push(movieEl.textContent);
          }
        } else {
          favoritesArray = favoritesArray.filter(function (item) {
            return item !== movieEl.textContent;
          });

          //   const shouldKeep = function(value) {return value !== movieEl.textContent;}
          //   const newArray = [];
          //   for (let i = 0; i <  favoritesArray.length;i++) {
          //       if (shouldKeep(favoritesArray[i])) {
          //           newArry.push(favoritesArray[i]);
          //       }
          //   }
          //   favoritesArray = newArray
        }
        localStorage.setItem("favorites", JSON.stringify(favoritesArray));
        console.log(favoritesArray);
        displayFavorites();
      });
    }
  });
};
// submit city button event listener to trigger form submit handler
cityFormEl.addEventListener("submit", formCityHandler);
