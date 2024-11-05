"use strict";

function loadMountains(params) {
  let select = document.querySelector('#select-mountain')
  for (const mountain of mountainsArray) {
    let option = new Option(mountain.name, mountain.elevation)
    option.dataset.description = mountain.desc
    option.dataset.image = mountain.img
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

  let div = document.querySelector('#card-mountain')
  div.style.display = 'block'
}
