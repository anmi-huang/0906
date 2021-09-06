
(() => {
    let dataAll
    let currentLocationData

    const locationSelect = document.querySelector('#location-select')
    const elAvg = document.querySelector('#avg')
    const elIcon = document.querySelector('#icon')
    const elStatus = document.querySelector('#status')
    const elMin = document.querySelector('#min')
    const elMax = document.querySelector('#max')

	const setSelector = (data) => {
		locationSelect.innerHTML=data.map((item,idx)=>`<option value="${idx}">${item.location}</option>`).join('')
		locationSelect.addEventListener('change',(e)=>{
			setCurrentLocationWeather(dataAll[e.target.value])
		})
	}

	const setCurrentLocationWeather = (data) => {
		elAvg.innerHTML = data.T.elementValue.value
		elMax.innerHTML = data.MaxT.elementValue.value
		elMin.innerHTML = data.MinT.elementValue.value
		elIcon.src = `assets/images/icon/weather-${data.Wx.elementValue[1].value}.svg`
		elStatus.innerHTML = data.Wx.elementValue[0].value
	}
	
    fetch('api/forecast.json').then(resp => resp.json()).then(({ data }) => {
    	dataAll = data
    	currentLocationData = dataAll[0]
		setSelector(dataAll)
		setCurrentLocationWeather(currentLocationData)
    })
})()
