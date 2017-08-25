
// transportation mode selection 
let modeBtns = document.querySelectorAll('button[type="button"]')
modeBtns.forEach((el)=> {
  el.addEventListener('click', ()=> {

    if (el.className === 'btnActive') {
      el.setAttribute('class', 'btnInactive')
      document.querySelector("input[name='"+el.getAttribute("name")+"']").checked = false
      console.log(document.querySelector("input[name='"+el.getAttribute("name")+"']"))
    } else {
      el.setAttribute('class', 'btnActive')
      document.querySelector("input[name='"+el.getAttribute("name")+"']").checked = true

    }
  })
});

// form submit
let form = document.getElementById('index-form')
let departure = document.getElementById('departure')
let arrival = document.getElementById('arrival')

form.addEventListener('submit', (e)=>{
  e.preventDefault();

  // err feedback
  if (departure.value === '') {
    departure.style.backgroundColor="pink";
  } else {
    departure.style.backgroundColor="white";
  }
  if (arrival.value === '') {
    arrival.style.backgroundColor="pink";
  } else {
    arrival.style.backgroundColor="white";
  }

  // request
  if (departure.value !== '' && arrival.value !== '') {
    // let request = {
    //   "departure": departure.value,
    //   "arrival": arrival.value
    // }

    // modeBtns.forEach((el)=> {
    //   let modeName = el.getAttribute("name")
    //   console.log(modeName)
    //   if (el.className === 'btnActive') {
    //     request[modeName] = true
    //   } else {
    //     request[modeName] = false
    //   }
    // })

    // console.log(request)

    form.submit();

    // fetch("/results", {
    //   method: "POST",
    //   body: JSON.stringify(request),
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   }
    // })
  }

})