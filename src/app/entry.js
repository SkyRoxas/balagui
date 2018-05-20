const openWeather = require('openweather-apis')

const weatherInfo = (city, offset, imgSrc) => {
  const date = new Date()
  const localDate = date.getTime()
  const UTC = localDate + ( date.getTimezoneOffset() * 60000)
  const currectDate = new Date(UTC + (3600000 * offset))
  const currectHours = (currectDate.getHours() >= 10 ) ? currectDate.getHours() : `0${currectDate.getHours()}`
  const currectMinutes = (currectDate.getMinutes() >= 10 ) ? currectDate.getMinutes() : `0${currectDate.getMinutes()}`

  openWeather.setLang('zh')

  openWeather.setCity(city)

  openWeather.setAPPID('c8d534899e3021e14893ca5efed156dc')

  return new Promise((resolve, reject) => {
      openWeather.getAllWeather(function (err, JSONObj) {
      let { main, weather } = JSONObj
      weather = weather[0]

      const timeStr = `<div style="padding-right:15px;"><h3 style="font-weight:400; line-height:30px; white-space:nowrap;">${currectHours} : ${currectMinutes}</h3></div>`
      const contry = `<div style="padding-right:15px;"><img src ="${imgSrc}" width="50"/></div>`
      const iconDOM = `<div style="padding-right:15px;"><img width="50" src ="./images/weather_${weather.icon}.png"></div>`
      const tempStr = `<div>${main.temp_min}/${main.temp_max}℃</div>`

      const item = document.createElement('li')
      item.classList.add('d-flex', 'align-items-end', 'px-5', 'mb-3')
      item.innerHTML = `${contry} ${timeStr} ${iconDOM} ${tempStr}`

      const info = {
        html: item,
        city: city
      }
      resolve(info)
    });
  });
}

(async () =>{
  if (!document.getElementById('weatherInfo')) {
    return
  }
  let Asuncion = await weatherInfo('Asuncion', -4, './images/pa.png')
  document.getElementById('weatherInfo').appendChild(Asuncion.html)
  let Taipei = await weatherInfo('Taipei', 8, './images/tw.png')
  document.getElementById('weatherInfo').appendChild(Taipei.html)
})();


// preload

window.addEventListener('load', ()=>{
  if( !document.getElementById('preloader') ){
    return
  }
  document.getElementById('preloader').classList.add('loaded')
})
