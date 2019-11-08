$( document ).ready(function() {
    
    console.log( "Estoy acá" );
   
    const base = "http://localhost:62425";



    async function f_a_limpiarCampo(p_IdCampo){
        var limpiarCampo = $('#'+p_IdCampo).val('');
        await limpiarCampo ;
      }
      
      // Mensaje dinamico creado con Sweetalert 2 para dar respuesta a los procesos,p_=Parametro de entrada
      function f_mensajeProceso(p_titulo,p_mensaje,ptipo_mensaje) {
     
        Swal.fire({
         title: ""+p_titulo,
         text: ""+p_mensaje,
         type: ""+ptipo_mensaje,
         showCancelButton: true,
         cancelButtonText: 'Cerrar',
       });
     }

      // Esta función asincronica (f_a_) rellena un text area por medio del id del mismo el cual se especifica en el html con la data en formato JSON, p_=Parametro de entrada
  async function f_a_rellenarTextAreaJson(p_data,p_IdtextArea){
    var rellenar = JSON.stringify(p_data, undefined, 2);
     await $('#'+p_IdtextArea).val(rellenar);
   }
 
    async function f_a_PostLoginUsuarios(pcorreo,pcontrasena) {
  
    await axios.post("http://localhost:62425/api/Usuarios/Autenticar",{
                              'usu_email':pcorreo,
                              'usu_password':pcontrasena
                            }).then(response => {
     
      //f_a_rellenarTextAreaJson(response.data,"JSONTextarea5");
  
      //f_a_impirmirEstadoApi(response.status,"apiestadopost"); data[50].employee_name
      
      // console.log(response.data);

       f_mensajeProceso(""+response.data.MensajeProceso,"El token es: "+response.data.Datos.token,"success"); 
         
       $('#pToken').val(response.data.Datos.token);

   }).catch(error => {
  
       f_mensajeProceso("Error de consumo de API",
       ""+error.response.data,
       "error");
   
       //f_a_limpiarTextArea("JSONTextarea5");
   
      // f_a_impirmirEstadoApi(error.response.status,"apiestadopost");
   }); 
  }

  async function f_a_consumirApiGet(uriApi) {
    
    var vtoken = document.getElementById("pToken").value;

    let header={"Authorization":"Bearer "+vtoken};
    let configuracion={headers : header};
    
    var vApi = (base+uriApi).trim();
     
     console.log(" el api get es: "+vApi);

    await axios.get(vApi,configuracion).then(response => {
         

        f_a_rellenarTextAreaJson(response.data,"JSONTextarea2");

        f_mensajeProceso("Usuarios",response.data.MensajeProceso,"success"); 

     
        
     }).catch(function(error){
      
        f_mensajeProceso("Error de consumo de API",
                        ""+error,
                        "error");
             
        f_a_limpiarCampo("JSONTextarea2");

     }); 
    }
   
    /************************************************************************************* */
    $("#pcorreo").change(function(){
        f_a_limpiarCampo("pToken");
    });
    
    $("#btnIngresar").click(function(){
       
        console.log( "1.Diste clic al boton ingresar del login" );
        
        var v_correo = document.getElementById("pcorreo").value;
        var v_contrasena = document.getElementById("pcontrasena").value;
        
        if (!v_contrasena || !v_correo ) {
        console.log( "2. No puedes dejar campos vacios" );

           f_mensajeProceso("Campos vacios","No puedes dejar campos vacios","error");

        }else {
            console.log( "1.El correo fue: "+v_correo );
            console.log( "2.La contraseña fue: "+v_contrasena );

            f_a_limpiarCampo("pcorreo");
            f_a_limpiarCampo("pcontrasena");

            f_a_PostLoginUsuarios(v_correo,v_contrasena);      
        }
    }); // fin del evento de ingresar

    // Inicio metodo GET  
    $("#collapseOne").on("click", "#btnConsumirGet", function(){

        var uriGet = document.getElementById("papiGet").value;
         
        f_a_consumirApiGet(uriGet);
       
      });

      $("#collapseOne").on("click", "#btnLimpiar2", function(){
        f_a_limpiarCampo("JSONTextarea2");
     
      })
     // Fin metodos GET
   

});