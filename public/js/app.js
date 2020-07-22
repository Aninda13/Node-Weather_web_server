console.log('Client side JS loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//      response.json().then((data) => {
//         console.log(data)
//      })
// })


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1') // the id starts frem the # sign , id direct to the paragraphs in HTML
const messageTwo = document.querySelector('#message-2')
 
// messageOne.textContent = 'From JavaScript'
weatherForm.addEventListener('submit' , (e) => {
   e.preventDefault();
   const location =searchElement.value;
   console.log(location)
messageOne.textContent = 'Loading...'
messageTwo.textContent = ' '
fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response) => {
  
   response.json().then((data) => {
     if (data.error){
        console.log(data.error)
        messageOne.textContent = data.error
        messageTwo.textContent = ' '

     }else{
      console.log(data.location)
      console.log(data.forecast)
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
     }
   }) 
})
})