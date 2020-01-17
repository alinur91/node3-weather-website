const weatherForm = document.querySelector('form')
const searchForm=document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageError = document.querySelector('#error')

messageOne.textContent= ''


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    let location = searchForm.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    

    fetch(`/weather?address=${location}`).then(res=>{
    res.json().then(data=>{
      if(data.error) {
          console.log(data.error)
          messageOne.textContent = data.error

      }else{
        console.log(data.location,data.forecast)
        messageOne.textContent= data.location
        messageTwo.textContent= data.forecast
      }

        
    })
})
})





