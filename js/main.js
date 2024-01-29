jQuery("head").append('<script src="js/jquery.fancybox.pack.js"></script>');
jQuery("head").append('<link href="css/jquery.fancybox.css" rel="stylesheet">');

/*price range*/
$('#sl2').slider();
var RGBChange = function() {
  $('#RGB').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
};		
/*scroll to top*/

$(document).ready(function(){
	$(function () {
		$.scrollUp({
	        scrollName: 'scrollUp', // Element ID
	        scrollDistance: 300, // Distance from top/bottom before showing element (px)
	        scrollFrom: 'top', // 'top' or 'bottom'
	        scrollSpeed: 300, // Speed back to top (ms)
	        easingType: 'linear', // Scroll to top easing (see http://easings.net/)
	        animation: 'fade', // Fade, slide, none
	        animationSpeed: 200, // Animation in speed (ms)
	        scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
					//scrollTarget: false, // Set a custom target element for scrolling to the top
	        scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
	        scrollTitle: false, // Set a custom <a> title if required.
	        scrollImg: false, // Set true to use image
	        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	        zIndex: 2147483647 // Z-Index for the overlay
		});
	});
});



//DIVISADEROOOOOOO-----------
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
jQuery(document).ready(function(){

	//ENVIO DE FORMULARIO NEWSLETTER
	jQuery(".searchform button").click(function(){
		jQuery(".searchform span.message").remove();
		if(validateEmail(jQuery(".searchform input").val())){
			//var content="<div class='fancyDiv'><h2>Welcome to our email list</h2><p>Thanks for signing up to get our emails</p></div>";
			jQuery.fancybox({
				'padding': [0, 20, 0, 20],
	            'width': 500,
	            'height': 150,
	            'autoScale': false,
	            'type': 'iframe',
	            'href': 'newsletter_ok.html'
	        });
		}else{
			jQuery(".searchform button").after("<span class='message'>Email error</a>");
		}
		return false;
	});


	//ENVIO DE COMENTARIOS
	jQuery("#reviews form button").click(function(){
		var validMail, validName, validComment;
		jQuery("span.message").remove();
		if(validateEmail(jQuery("#reviews form input[type=email]").val())){
			validMail = true;
			jQuery("#reviews form input[type=email]").removeClass("red");
		}else{
			validMail = false;
			jQuery("#reviews form input[type=email]").addClass("red");
		}
		if(jQuery("#reviews form input[type=text]").val().length){
			validName = true;
			jQuery("#reviews form input[type=text]").removeClass("red");
		}else{
			validName = false;
			jQuery("#reviews form input[type=text]").addClass("red");
		}
		if(jQuery("#reviews form textarea").val().length){
			validComment = true;
			jQuery("#reviews form textarea").removeClass("red");
		}else{
			validComment = false;
			jQuery("#reviews form textarea").addClass("red");
		}
		if(validName && validComment && validMail){
			var content="<div class='fancyDiv'><h2>Thanks for comment</h2><p>-</p></div>";
			jQuery.fancybox({
				'padding': [0, 20, 0, 20],
	            'width': 500,
	            'height': 150,
	            'autoScale': false,
	            'type': 'html',
	            'content': content
	        });
		}
		return false;
	});

	//VIDEOS
	jQuery(".video-gallery a").click(function() {
		$.fancybox({
			'padding'		: 0,
			'autoScale'		: false,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none',
			'title'			: this.title,
			'width'			: 640,
			'height'		: 385,
			'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
			'type'			: 'swf',
			'swf'			: {
			'wmode'				: 'transparent',
			'allowfullscreen'	: 'true'
			}
		});
		return false;
	});

	//ZOOM IMAGENES PRODUCTO
	jQuery(".zoom").mousedown(function() {
		var img=jQuery(".zoom").parent("h3").prev("img").attr("src");
		$.fancybox({
			'padding'		: 0,
			'autoScale'		: false,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none',
			'href'			: img,
			'type'			: 'image'
		});
		return false;
	});

	//AÑADIR A CARRITO
	if(sessionStorage.getItem('numProducts')!=null && document.location.href.indexOf("thanks")==-1){
		jQuery(".shop-menu li a[href='cart.html']").append("<span>" + sessionStorage.getItem('numProducts') + "</span>");
	}
	jQuery(".add-to-cart:contains('Add to cart')").mousedown(function(){
		if(sessionStorage.getItem('numProducts')!=null){
			sessionStorage.setItem('numProducts', parseInt(sessionStorage.getItem('numProducts'))+1);
			jQuery(".shop-menu li a[href='cart.html'] span").text(sessionStorage.getItem('numProducts'));
		}else{
			sessionStorage.setItem('numProducts', 1);
			jQuery(".shop-menu li a[href='cart.html']").append("<span> 1</span>");
		}
		return false;
	});
	jQuery("button.cart").mousedown(function(){
		var enCesta = parseInt(sessionStorage.getItem('numProducts'));
		if(sessionStorage.getItem('numProducts')==null){
			enCesta=0;
		}
		var articulos = parseInt(jQuery(".product-information input[type=text]").val());
		var total=enCesta+articulos;
		console.log(enCesta, articulos, total);
		sessionStorage.setItem('numProducts', total);
		if(enCesta==0){
			jQuery(".shop-menu li a[href='cart.html']").append("<span> " + total + "</span>");
		}
		jQuery(".shop-menu li a[href='cart.html'] span").text(total);
		
		return false;
	});
	jQuery(".add-to-cart:contains('Add to cart'), button.cart").mousedown(function(){
		jQuery(this).html("<i class='fa fa-check-square-o'></i>Add to cart").addClass("added");
	});

	//ELIMINAR ELEMENTO DE CESTA
	jQuery(".cart_quantity_delete").mousedown(function(){
		jQuery(this).parents("tr").remove();
		sessionStorage.setItem('numProducts', jQuery(".cart_info table tbody tr").length);
		jQuery(".shop-menu li a[href='cart.html'] span").text(jQuery(".cart_info table tbody tr").length);
		return false;
	});

	//MODO DE PAGO
	jQuery(".payment-options input[type=checkbox]").change(function() {
        if(jQuery(".payment-options input[type=checkbox]:checked").length) {
        	console.log("chekado");
            jQuery(".btn.btn-primary.pay").show();
        }else{
        	jQuery(".btn.btn-primary.pay").hide();
        	console.log("ocultar");
        }    
    });
	

	//MINIATURAS DE PRODUCTO
	jQuery("#similar-product a").click(function(){
		console.log(jQuery(this).find("img").attr("src"));
		jQuery(".view-product img").attr("src",jQuery(this).find("img").attr("src"));
		return false;
	});


	//CANTIDAD CESTA
	jQuery(".cart_quantity_up").click(function(){
		jQuery(this).next("input.cart_quantity_input").val(parseInt(jQuery(this).next("input.cart_quantity_input").val())+1);
		return false;
	});
	jQuery(".cart_quantity_down").click(function(){
		if(jQuery(this).prev("input.cart_quantity_input").val()>1){
			jQuery(this).prev("input.cart_quantity_input").val(parseInt(jQuery(this).prev("input.cart_quantity_input").val())-1);
		}
		return false;
	});

	//RETURN FALSE EN ENLACES CON #
	jQuery(".btn.btn-default.add-to-cart, .choose .nav-pills a, .pagination a").click(function(){
		return false;
	});


});