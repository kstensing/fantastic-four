var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var currentContainerEl = document.querySelector("#current-conditions-container");
var currentCity = document.querySelector("#current-city-weather");




// submit city button event listener to trigger form submit handler
cityFormEl.addEventListener("submit", formSubmitHandler);