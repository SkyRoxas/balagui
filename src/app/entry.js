const openWeather = require('openweather-apis')

const weatherInfo = (city, offset) => {
  const info = {}
  const date = new Date()
  const localDate = date.getTime()
  const UTC = localDate + ( date.getTimezoneOffset() * 60000)
  const currectDate = new Date(UTC + (3600000 * offset))
  const currectHours = (currectDate.getHours() > 10 ) ? currectDate.getHours() : `0${currectDate.getHours()}`
  const currectMinutes = (currectDate.getMinutes() > 10 ) ? currectDate.getMinutes() : `0${currectDate.getMinutes()}`

  openWeather.setLang('zh')

  openWeather.setCity(city)

  openWeather.setAPPID('c8d534899e3021e14893ca5efed156dc')

  openWeather.getAllWeather(function(err, JSONObj){

    let { main, weather } = JSONObj

    weather = weather[0]

    const timeStr = `${currectHours}:${currectMinutes}`
    const tempStr = `${main.temp_min}/${main.temp_max}℃`
    const iconDOM = `<img src ="http://openweathermap.org/img/w/${weather.icon}.png">`

    const item = document.createElement('li')
    item.innerHTML = `${timeStr} ${tempStr} ${iconDOM}`
    document.getElementById('weather').appendChild(item)
    console.log(JSONObj)
  })

  return info
}

weatherInfo('Asuncion', -4)
weatherInfo('Taipei', 8)
