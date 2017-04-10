if(navigator.serviceWorker){
	navigator.serviceWorker.register("sw.js")
}


;(function(){

	let sticky = false
	let currentPosition = 0

	const imageCounter = $("[data-name='image-counter']").attr("content")
	const email = "correo@tucorreo.com"

	$("#contact-form").on("submit",function(ev){
		ev.preventDefault()

		sendForm($(this))

		return false
	})

	console.log(imageCounter)

	$("#sticky-navigation").removeClass("hidden")
	$("#sticky-navigation").slideUp(0)

	checkScroll()
	isOpen()

	$("#menu-opener").on("click", toggleNav)

	$(".menu-link").on("click", toggleNav)

	function toggleNav(){
		$("#responsive-nav ul").toggleClass("active")
		$("#menu-opener").toggleClass("glyphicon-menu-hamburger")
	}

	setInterval(()=>{

		if(currentPosition < imageCounter){
			currentPosition++
		}else{
			currentPosition = 0
		}
		

		$("#gallery .inner").css({
			left: "-"+currentPosition*100+"%"
		})

	},4000)


	$(window).scroll(checkScroll)


	function isOpen(){
		let date = new Date()
		const current_hour = date.getHours()

		if(current_hour < 17 || current_hour > 23){
			$("#is-open .text").html("Cerrado ahora <br> Abierto de 5:00pm a 11:00pm")
		}


	}


	function stickNavigation(){
		$("#description").addClass("fixed").removeClass("absolute")
		$("#navigation").slideUp("fast")
		$("#sticky-navigation").slideDown("fast")
	}

	function unStickNavigation(){
		$("#description").removeClass("fixed").addClass("absolute")
		$("#navigation").slideDown("fast")
		$("#sticky-navigation").slideUp("fast")
	}

	function checkScroll(){
			const inBottom = isInBottom()

		if(inBottom && !sticky){
			// Mostrar la navegacion
			sticky = true
			stickNavigation()
		}
		if(!inBottom && sticky){
			// Ocultar la navegacion
			sticky = false
			unStickNavigation()
			console.log("Regresar la navegacion")
		}
}


	function isInBottom(){
		const $description = $("#description")
		const descriptionHeight = $description.height();

		return $(window).scrollTop() > $(window).height() - (descriptionHeight * 2)
	}


})()