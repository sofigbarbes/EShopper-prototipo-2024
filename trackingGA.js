<script type="text/javascript">
	try {
		// Identificador de nuestra propiedad en GA
		var UA_PROPERTY = "UA-131699429-1";

		// Cargando script con Javascript Vanilla 
		// Cargamos el script del gtag justo antes que este script

		var scriptGtag = document.createElement("script");
		scriptGtag.async = true;
		scriptGtag.src = "https://www.googletagmanager.com/gtag/js?id=" + UA_PROPERTY;

		var o = document.getElementsByTagName("script")[1];

		o.parentNode.insertBefore(scriptGtag, o);
		window.dataLayer = window.dataLayer || [];

		function gtag(){
		 	dataLayer.push(arguments);
		}
		
	 	gtag('js', new Date());
	 	gtag('config', UA_PROPERTY);

		// -------- Eventos Asíncronos -------------------------// 
		if (typeof jQuery == "function") { // CARGAR LOS SCRIPTS DEL DOM
			jQuery(document).ready(function(){
				console.log(" -- DOM Ready");

		        try {
		            // recuperamos el objeto DOM asociado al boton
		            var btnEnviar = document.getElementById("enviar");
		            // Le asignamos a dicho objeto un manejador de eventos que escucha las acciones de clic sobre dicho boton
		            btnEnviar.addEventListener("click", function(event){
		                var textoBoton = event.target.innerText;
		                if (typeof gtag == "function") {
		                    if (typeof textoBoton == "string") {

		                        // Realizamos un envio de un hit para la accion de click de dicho botón
		                        gtag('event', 'clic_boton', {
		                            'event_category': 'cabecera',
		                            'event_label': textoBoton.toLowerCase(),
		                            'dimension15': 'nombre'
		                        });

		                    }else{
		                        console.log("ERR: No ha podido recuperar el texto del botón");                          
		                    }
		                }
		            });
		        }
		        catch(e){
		            console.log("ERROR: Detectado fallo ");
		        } 
		    });
		}
	}
	catch(e) {}

</script>