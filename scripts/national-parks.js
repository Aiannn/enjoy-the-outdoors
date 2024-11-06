function loadParks(parks) {

  // List of object keys in nationalParkData (except Location)
  const columns = [
    "LocationID", "LocationName", "Address", "City", "State", "ZipCode",
    "Phone", "Fax", "Visit", "Latitude", "Longitude"
  ];

  let tableBody = document.querySelector('#table-body')
  // iterate through array of objects (nationalParkData)
  for (const park of parks) {
    let tr = document.createElement('tr')
    tableBody.append(tr) 

    // use the predefined array on line 3
    // here essentially iterate through the object element keys inside nationalParkData array
    // the reason I don't do "for (key in park)" is because 
    // some of the objects don't have "Visit" key
    // and I can get the column populated with
    // inappropriate data (like latitude data in website column)
    for (column of columns) {
      let td = document.createElement('td')
      if (column === 'Visit') {
        // Check if object does have "Visit" key
        // create <a> tag and put it inside <td>
        if (park[column]) { 
          let websiteCell = document.createElement('a')
          websiteCell.href = park[column]
          websiteCell.innerText = 'Website' 
          websiteCell.target = '_blank'
          td.append(websiteCell)
        } else {
          //If object doesnt have "Visit" key 
          // put N/A into column
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

// Load options to the dropdown for both "By Type" and "By State"
function loadOptions(statesOrTypes) {
  let select = document.querySelector('#select')
  let optionInitial = new Option('Select...', 0) // creating the initial select Select... since if we create it in html, it will be deleted in showSelect function
  select.append(optionInitial)
  for (let element of statesOrTypes) {
    let option = new Option(element, element) 
    select.append(option)
  }
}

function showSelect() {
  let select = document.querySelector('#select')
  let radioByState = document.querySelector('#radio-by-state')
  let radioByType = document.querySelector('#radio-by-type')

  // probably should use e.target
  // could have made it simplier here
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

