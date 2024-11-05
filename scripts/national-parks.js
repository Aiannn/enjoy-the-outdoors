function loadParks(parks) {

  const columns = [
    "LocationID", "LocationName", "Address", "City", "State", "ZipCode",
    "Phone", "Fax", "Visit", "Latitude", "Longitude", "Location"
  ];

  let tableBody = document.querySelector('#table-body')
  for (const park of parks) {
    let tr = document.createElement('tr')
    tableBody.append(tr) 

    // use the predefined array on line 3
    for (column of columns) {
      let td = document.createElement('td')
      if (column === 'Visit') {
        // td.innerText = park[column] || 'N/A'
        if (park[column]) {
          let websiteCell = document.createElement('a')
          websiteCell.href = park[column]
          websiteCell.innerText = 'Website' 
          websiteCell.target = '_blank'
          console.log(park[column])
          td.append(websiteCell)
        } else {
          td.innerText = 'N/A'
        }
      } else {
        td.innerText = park[column]
      }
      tr.append(td)
    }
  }
}
loadParks(nationalParksArray)

function loadOptions(statesOrTypes) {
  let select = document.querySelector('#select')
  for (let element of statesOrTypes) {
    let option = new Option(element, element) 
    select.append(option)
  }
}

function showSelect() {
  let select = document.querySelector('#select')
  let radioByState = document.querySelector('#radio-by-state')
  let radioByType = document.querySelector('#radio-by-type')

  select.innerHTML = ''
  if (radioByState.checked) {
    select.style.display = 'block'
    loadOptions(locationsArray)
  } else if (radioByType.checked) {
    select.style.display = 'block'
    loadOptions(parkTypesArray)
  } else {
    null
  }
}

function filterBy() {
  let radioByState = document.querySelector('#radio-by-state')
  let radioByType = document.querySelector('#radio-by-type')

  let tableBody = document.querySelector('#table-body')
  tableBody.innerHTML = ''

  let select = document.querySelector('select')
  let newArr = nationalParksArray.filter(park => {
    if (radioByState.checked) {
      return select.value === park.State
    } else if (radioByType.checked) {
      return park.LocationName.includes(select.value)
    }
  })
  console.log(newArr)
  loadParks(newArr)

}

