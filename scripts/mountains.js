"use strict";

function loadMountains() {
  let select = document.querySelector('#select-mountain')
  for (const mountain of mountainsArray) {
    let option = new Option(mountain.name, mountain.elevation)
    option.dataset.description = mountain.desc
    option.dataset.image = mountain.img
    option.dataset.latitude = mountain.coords.lat
    option.dataset.longitude = mountain.coords.lng
    select.append(option)
  }
}
loadMountains()

function showMountain() {
  // I didn't want to iterate through an array again using .find
  // since time complexity increases.
  // I found the way of giving all required data to an 
  // option element using dataset better, although space complexity increases

  let select = document.querySelector('#select-mountain')
  // Get clicked option element
  let selectedOption = select.options[select.selectedIndex]
  console.log(selectedOption)

  let cardName = document.querySelector('#card-mountain-title')
  cardName.textContent = selectedOption.innerText

  let cardDesc = document.querySelector('#card-mountain-desc')
  cardDesc.textContent = selectedOption.dataset.description

  let cardElev = document.querySelector('#card-mountain-elevation')
  cardElev.textContent = 'Elevation: ' + selectedOption.value + ' feet'

  let cardImg = document.querySelector('#card-mountain-image')
  cardImg.src = './images/' + selectedOption.dataset.image

  fetchSunsetTimes(selectedOption.dataset.latitude, selectedOption.dataset.longitude)
  

  let div = document.querySelector('#card-mountain')
  div.style.display = 'block'
}

async function fetchSunsetTimes(lat, lng) {
  let cardSunrise = document.querySelector('#card-mountain-sunrise')
  let cardSunset = document.querySelector('#card-mountain-sunset')
  fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })
  .then(data => {
    console.log(data)
    cardSunrise.innerText = 'Sunrise: ' + data.results.sunrise
    cardSunset.innerText = 'Sunset: ' + data.results.sunset
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error)
  })
} 
