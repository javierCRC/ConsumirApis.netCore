$( document ).ready(function() {
    
    console.log( "Estoy acá" );
   
    const base = "http://localhost:62425";

     // Mensaje dinamico creado con Sweetalert 2 para dar respuesta a los procesos,p_=Parametro de entrada
     function f_mensajeProceso(p_titulo,p_mensaje,ptipo_mensaje) {
     
      Swal.fire({
       title: ""+p_titulo,
       text: ""+p_mensaje,
       icon: ""+ptipo_mensaje,
       showCancelButton: true,
       cancelButtonText: 'Cerrar',
       showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      },
       timer: 5000
     });
   }

 

    async function f_a_AvisoExpiraToken(){


      await setTimeout(function(){ f_mensajeProceso("Alerta","El token esta a 1 minuto de expirar","warning")}, 60000);
      
      
    }
    
    
    async function f_a_AvisoTokenExpirado(){


      await setTimeout(function(){ f_mensajeProceso("Notificación","El token ha expirado,vuelve ingresar.","info"),f_a_limpiarCampo("pToken")}, 120000);
      
      
    }

    

    async function f_a_limpiarCampo(p_IdCampo){
        var limpiarCampo = $('#'+p_IdCampo).val('');
        await limpiarCampo ;
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

       f_a_AvisoExpiraToken();
       f_a_AvisoTokenExpirado();

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

    
  async function f_a_consumirApiGetID(puriApi,pIdUsuario) {
    
    var vtoken = document.getElementById("pToken").value;

    let header={"Authorization":"Bearer "+vtoken};
    let configuracion={headers : header};
    
    var vApi = base+puriApi+pIdUsuario;

     console.log(" El api getID es: "+vApi);

    await axios.get(vApi,configuracion).then(response => {
         

        f_a_rellenarTextAreaJson(response.data,"JSONTextarea3");

        f_mensajeProceso("Usuarios",response.data.MensajeProceso,"success"); 

     
        
     }).catch(function(error){
      
        f_mensajeProceso("Error de consumo de API",
                        ""+error,
                        "error");
             
        f_a_limpiarCampo("JSONTextarea3");

     }); 
    }

    async function f_a_consumirDelete(puriApi,pIdUsuario) {
    
      var vtoken = document.getElementById("pToken").value;
  
      let header={"Authorization":"Bearer "+vtoken};
      let configuracion={headers : header};
      
      var vApi = base+puriApi+pIdUsuario;
  
       console.log(" El api getID es: "+vApi);
  
      await axios.delete(vApi,configuracion).then(response => {
            
          f_mensajeProceso("Usuarios",response.data.MensajeProceso,"success"); 
  
       
          
       }).catch(function(error){
        
          f_mensajeProceso("Error de consumo de API",
                          ""+error,
                          "error");
               
          
  
       }); 
      }

      
    async function f_a_consumirActivar(puriApi,pIdUsuario) {
    
      var vtoken = document.getElementById("pToken").value;
  
      let header={"Authorization":"Bearer "+vtoken};
      let configuracion={headers : header};
      
      var vApi = base+puriApi+pIdUsuario;
  
       console.log(" El api activar es: "+vApi);
  
      await axios.put(vApi,{},configuracion).then(response => {
            
          f_mensajeProceso("Usuarios",response.data.MensajeProceso,"success"); 
  
       
          
       }).catch(function(error){
        
          f_mensajeProceso("Error de consumo de API",
                          ""+error,
                          "error");
               
          
  
       }); 
      }

      async function f_a_consumirInactivar(puriApi,pIdUsuario) {
    
        var vtoken = document.getElementById("pToken").value;
    
        let header={"Authorization":"Bearer "+vtoken};
        let configuracion={headers : header};
        
        var vApi = base+puriApi+pIdUsuario;
    
         console.log(" El api Inactivar es: "+vApi);
    
        await axios.put(vApi,{},configuracion).then(response => {
              
            f_mensajeProceso("Usuarios",response.data.MensajeProceso,"success"); 
    
         
            
         }).catch(function(error){
          
            f_mensajeProceso("Error de consumo de API",
                            ""+error,
                            "error");
                 
            
    
         }); 
        }

  
    function f_MensajeDecision(p_titulo,p_mensaje,p_accion,pApi2,pIdUsuario2){
      Swal.fire({
        title: ""+p_titulo,
        text: ""+p_mensaje,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Si,"+p_accion
      }).then((result) => {
        if (result.value) {
  
          switch (p_accion) {
            case "eliminar":

               //alert("Eliminar fue escogido");

              f_a_consumirDelete(pApi2,pIdUsuario2);

              break;
            case "activar":
              
                f_a_consumirActivar(pApi2,pIdUsuario2);

              break;
            case "inactivar":
               
                f_a_consumirInactivar(pApi2,pIdUsuario2);

              break;
            
          } 

        } else if (
          
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            ''+p_titulo,
            'Se ha cancelado '+p_accion+" "+p_titulo,
            'error'
          );
        }
      });
  
     }
   
    /************************************************************************************* Eventos*/
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
   

     // ---------------------------------------------------------------------------------------------------Inicio metodo GET-ID

     $("#collapseTwo").on("click", "#btnConsumirGetID", function(){
      
      var vUriApi =document.getElementById("pUriApi").value;
      var vidUsuario = document.getElementById("pidUsuario").value;
        //console.log("id del usuario ingresado fue: "+vidUsuario);
        //console.log("el uri ingresado fue: "+vUriApi);

      
        f_a_consumirApiGetID( vUriApi,vidUsuario);

     });

     $("#collapseTwo").on("click", "#btnLimpiar3", function(){
      f_a_limpiarCampo("JSONTextarea3");
   
    })

     // -------------------------------------------------------------------------------------------------------Fin metodo GET-ID

     // ---------------------------------------------------------------------------------------------------Inicio metodo DELETE
    
     $("#collapseThree").on("click", "#btnConsumirDelete", function(){
      
      var vUriApiDel =document.getElementById("pUriApiDel").value;
      var vidUsuarioDel = document.getElementById("pidUsuarioDel").value;
        //console.log("id del usuario ingresado fue: "+vidUsuarioDel);
        //console.log("el uri ingresado fue: "+vUriApiDel);

        f_MensajeDecision("Usuario","¿Quieres eliminar?","eliminar",vUriApiDel,vidUsuarioDel);

    
     });

     $("#collapseThree").on("click", "#btnLimpiar4", function(){
      f_a_limpiarCampo("pidUsuarioDel");
   
    })
     
     // ---------------------------------------------------------------------------------------------------Fin metodo DELETE
    
     // ---------------------------------------------------------------------------------------------------Inicio metodo Activar
      
     $("#collapseFive").on("click", "#btnConsumirAct", function(){
      
      var vUriApiAct =document.getElementById("pUriApiAct").value;
      var vidUsuarioAct = document.getElementById("pidUsuarioAct").value;
        console.log("id del usuario ingresado fue: "+vidUsuarioAct);
        console.log("el uri ingresado fue: "+vUriApiAct);

        f_MensajeDecision("Usuario","¿Quieres activar?","activar",vUriApiAct,vidUsuarioAct);

    
     });

     $("#collapseFive").on("click", "#btnLimpiarAct", function(){
      f_a_limpiarCampo("pidUsuarioAct");
   
    })


     // ---------------------------------------------------------------------------------------------------Fin metodo Activar

      // ---------------------------------------------------------------------------------------------------Inicio metodo Inactivar
      
      $("#collapseFor").on("click", "#btnConsumirInac", function(){
      
        var vUriApiInac =document.getElementById("pUriApiInac").value;
        var vidUsuarioInac = document.getElementById("pidUsuarioInac").value;
          //console.log("id del usuario ingresado fue: "+vidUsuarioInac);
          //console.log("el uri ingresado fue: "+vUriApiInac);
  
          f_MensajeDecision("Usuario","¿Quieres inactivar?","inactivar",vUriApiInac,vidUsuarioInac);
  
      
       });
  
       $("#collapseFor").on("click", "#btnLimpiarInac", function(){
        f_a_limpiarCampo("pidUsuarioInac");
     
      })
  
  
       // ---------------------------------------------------------------------------------------------------Fin metodo Inactivar
});