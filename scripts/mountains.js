"use strict";

function loadMountains(params) {
  let select = document.querySelector('#select-mountain')
  for (const mountain of mountainsArray) {
    let option = new Option(mountain.name, mountain.elevation)
    option.dataset.description = mountain.desc
    option.dataset.image = mountain.img
    option.dataset.latitude = mountain.coords.lat
    option.dataset.longitude = mountain.coords.lng
    console.log(option)
    select.append(option)
  }
}
loadMountains()

function showMountain() {
  let select = document.querySelector('#select-mountain')
  let selectedOption = select.options[select.selectedIndex]
  console.log(selectedOption)

  let cardName = document.querySelector('#card-mountain-title')
  cardName.textContent = selectedOption.innerText
  console.log(selectedOption.name, selectedOption)
  let cardDesc = document.querySelector('#card-mountain-desc')
  cardDesc.textContent = selectedOption.dataset.description
  let cardElev = document.querySelector('#card-mountain-elevation')
  cardElev.textContent = selectedOption.value + ' feet'
  let cardImg = document.querySelector('#card-mountain-image')
  cardImg.src = './images/' + selectedOption.dataset.image
  console.log(typeof selectedOption.dataset.image)


  let cardSunrise = document.querySelector('#card-mountain-sunrise')
  let cardSunset = document.querySelector('#card-mountain-sunset')
  let sunResults = fetchSunsetTimes(selectedOption.dataset.latitude, selectedOption.dataset.longitude)
  
  // cardSunrise.innerText = sunResults.results
  // cardSunset.innerText = sunResults.results



  let div = document.querySelector('#card-mountain')
  div.style.display = 'block'
}

async function fetchSunsetTimes(lat, lng) {
  let cardSunrise = document.querySelector('#card-mountain-sunrise')
  let cardSunset = document.querySelector('#card-mountain-sunset')
  let results = null
  fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })
  .then(data => {
    results = data
    console.log(data)
    cardSunrise.innerText = data.results.sunrise
    cardSunset.innerText = data.results.sunset
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error)
  })
  return results
} 
