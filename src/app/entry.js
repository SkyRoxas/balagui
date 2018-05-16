const openWeather = require('openweather-apis')

const weatherInfo = (city, offset, imgSrc) => {
  const info = {}
  const date = new Date()
  const localDate = date.getTime()
  const UTC = localDate + ( date.getTimezoneOffset() * 60000)
  const currectDate = new Date(UTC + (3600000 * offset))
  const currectHours = (currectDate.getHours() >= 10 ) ? currectDate.getHours() : `0${currectDate.getHours()}`
  const currectMinutes = (currectDate.getMinutes() >= 10 ) ? currectDate.getMinutes() : `0${currectDate.getMinutes()}`

  openWeather.setLang('zh')

  openWeather.setCity(city)

  openWeather.setAPPID('c8d534899e3021e14893ca5efed156dc')

  openWeather.getAllWeather(function(err, JSONObj){

    let { main, weather } = JSONObj

    weather = weather[0]

    const timeStr = `<div style="padding-right:5px;"><h3 style="font-weight:400; line-height:30px;">${currectHours} : ${currectMinutes}</h3></div>`
    const contry = `<div style="padding-right:5px;"><img src ="${imgSrc}" width="50"/></div>`
    const iconDOM = `<div style="padding-right:5px; height:35px; overflow:hidden;"><img src ="http://openweathermap.org/img/w/${weather.icon}.png"></div>`
    const tempStr = `<div>${main.temp_min}/${main.temp_max}℃</div>`

    const item = document.createElement('li')
    item.classList.add('d-flex', 'align-items-end', 'px-5')


    item.innerHTML = `${contry} ${timeStr} ${iconDOM} ${tempStr} `
    document.getElementById('weatherInfo').appendChild(item)
    console.log(JSONObj)
  })

  return info
}

weatherInfo('Asuncion', -4, './images/tw.png')
weatherInfo('Taipei', 8, './images/pa.png')
