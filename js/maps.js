;(function(){

	class UserLocation{
		static get(callback){
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition((location)=>{
					callback({
						lat: location.coords.latitude,
						lng: location.coords.longitude
					})
				})
			}else{
				alert("No pudimos detectar el lugar donde te encuentras")
			}
		}
	}

	const my_place = {
					lat: 19.4248097,
					lng: -99.1949255
				}

	google.maps.event.addDomListener(window,"load",()=>{
		const map = new google.maps.Map(
			document.getElementById('map'),
			{
				center: my_place,
				zoom: 15
			}
		)

		const marker = new google.maps.Marker({
			map: map,
			position: my_place,
			title: "Restaurante",
			visible: true
		})

		UserLocation.get((coords)=>{
			alert("ya tenog la coordenads")
			//calcular la dinstancia
			let origen = new google.maps.LatLng(coords.lat,coords.lng) //latLng 
			let destino = new google.maps.LatLng(my_place.lat,my_place.lng) //latLng 
			let service = new google.maps.DistanceMatrixService()
			service.getDistanceMatrix({
				origins: [origen],
				destinations: [destino],
				travelMode: google.maps.TravelMode.DRIVING
			},(response,status)=>{
				if(status === google.maps.DistanceMatrixService.OK){
					const duration_element = response.rows[0].elements[0]
					const duracion_viaje = duration_element.duration.text
					document.querySelector("#message")
							.innerHTML = `
								Estas a ${duracion_viaje}
								<span class="dacing-script medium">
									Restaurante
								</span>
							`


					console.log(duration_element)
				}
			})
		})

	})

})()