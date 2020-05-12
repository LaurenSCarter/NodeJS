//console.log('Client side javascript file is loaded')


//sample of fetching some basic JSON and loging to the client side console
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message_one = document.querySelector('#message-one')
const message_two = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevents the page from premature refresh after this action

    const location = searchElement.value //extracts the input value

    message_one.textContent = 'Loading'
    message_two.textContent = ''

    const URL = '/weather?address=' + encodeURIComponent(location)

    fetch(URL).then ((response) => {
        response.json().then((data) => {
            if(data.error){ 
                message_one.textContent = data.error
            }
            else { 
                message_one.textContent = data.location
                message_two.textContent = data.forecast
             }
        }) 
    })
})