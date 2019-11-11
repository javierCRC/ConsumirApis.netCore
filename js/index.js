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

      async function f_a_consumirInsertar(puriApi,pIdentificacion,pNombre,pUsername,pContrasena,pCorreos) {
    
        var vtoken = document.getElementById("pToken").value;
    
        let header={"Authorization":"Bearer "+vtoken};
        let configuracion={headers : header};
        
        var vApi = base+puriApi;
    
         console.log(" El api Insertar es: "+vApi);
    
        await axios.post(vApi,{
          'usu_identificacion':pIdentificacion,
          'usu_nombre':pNombre,
          'usu_username':pUsername,
          'usu_password':pContrasena,
          'usu_email':pCorreos
        },configuracion).then(response => {
              
            f_mensajeProceso("Usuarios",response.data.MensajeProceso,"success"); 
    
            
         }).catch(function(error){
          
            f_mensajeProceso("Error de consumo de API",
                            ""+error,
                            "error");
                 
            
    
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

     
     async function f_a_consumirApiGetIDActu(puriApi,pIdUsuario) {
    
      var vtoken = document.getElementById("pToken").value;
  
      let header={"Authorization":"Bearer "+vtoken};
      let configuracion={headers : header};
      
      var vApi = base+puriApi+pIdUsuario;
  
       console.log(" El api getIDActu es: "+vApi);
  
      await axios.get(vApi,configuracion).then(response => {
           
        $("#pidUsu").val(response.data.Datos["usu_codigo"]);
        $("#pnombreActu").val(response.data.Datos["usu_nombre"]);
        $("#pidentificacionActu").val(response.data.Datos["usu_identificacion"]);
        $("#pusernameActu").val(response.data.Datos["usu_username"]);
        $("#pCorreosActu").val(response.data.Datos["usu_email"]);    
  
       
          
       }).catch(function(error){
        
          f_mensajeProceso("Error de consumo de API",
                          ""+error,
                          "error");
               
          f_a_limpiarCampo("JSONTextarea3");
  
       }); 
      }

      async function f_a_consumirActualizar(puriApi,pIdUser,pIdentificacion,pNombre,pUsername,pContrasena,pCorreos) {
    
        var vtoken = document.getElementById("pToken").value;
    
        let header={"Authorization":"Bearer "+vtoken};
        let configuracion={headers : header};
        
        var vApi = base+puriApi;
    
         console.log(" El api Insertar es: "+vApi);
    
        await axios.put(vApi,{
          'usu_codigo':pIdUser,
          'usu_identificacion':pIdentificacion,
          'usu_nombre':pNombre,
          'usu_username':pUsername,
          'usu_password':pContrasena,
          'usu_email':pCorreos
        },configuracion).then(response => {
              
            f_mensajeProceso("Usuarios",response.data.MensajeProceso,"success"); 
    
            
         }).catch(function(error){
          
            f_mensajeProceso("Error de consumo de API",
                            ""+error,
                            "error");
                 
            
    
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

        // ---------------------------------------------------------------------------------------------------Inicio metodo Insertar
        
        $("#collapseSix").on("click", "#btnConsumirInsert", function(){
      
          var vUriApiInsert = document.getElementById("pUriApiInsert").value;
          var vnombre = document.getElementById("pnombre").value;
          var videntificacion = document.getElementById("pidentificacion").value;
          var vnombreUsuario  = document.getElementById("pusername").value;
          var vCorreo = document.getElementById("pCorreos").value;
          var vContrasena = document.getElementById("pContrasenas").value;

         

         
            //console.log("el uri ingresado fue: "+vUriApiInsert);
            //console.log("El nombre es: "+vnombre);
            //console.log("La identificación es: "+videntificacion);
            //console.log("El nombre usuario es: "+vnombreUsuario);
            //console.log("El correo es: "+vCorreo);
            //console.log("La contraseña es: "+vContrasena);
    
            f_a_consumirInsertar(vUriApiInsert,videntificacion,vnombre,vnombreUsuario,vContrasena,vCorreo);
    
        
         });

         $("#collapseSix").on("click", "#btnLimpiarInsert", function(){
          f_a_limpiarCampo("pnombre");
          f_a_limpiarCampo("pidentificacion");
          f_a_limpiarCampo("pusername");
          f_a_limpiarCampo("pCorreos");
          f_a_limpiarCampo("pContrasenas");
       
        });

         // ---------------------------------------------------------------------------------------------------Fin del metodo Insertar

        // ---------------------------------------------------------------------------------------------------Inicio del metodo Actualizar
        
        $("#pUserIdentificacion").change(function(){

          var vIdentGetActu = document.getElementById("pUserIdentificacion").value;
          f_a_consumirApiGetIDActu("/api/Usuarios/listarIDAsync/",vIdentGetActu);

          if(!vIdentGetActu){
            f_a_limpiarCampo("pidUsu");
            f_a_limpiarCampo("pnombreActu");
            f_a_limpiarCampo("pidentificacionActu");
            f_a_limpiarCampo("pusernameActu");
            f_a_limpiarCampo("pCorreosActu");
            f_a_limpiarCampo("pContrasenasActu");

          } 
          
      });

        
        $("#collapseSeven").on("click", "#btnConsumirActu", function(){
      
          var vUriApiActu = document.getElementById("pUriApiActu").value;
        
          var vIdUser = document.getElementById("pidUsu").value;
          var vnombreA = document.getElementById("pnombreActu").value;
          var videntificacionA = document.getElementById("pidentificacionActu").value;
          var vnombreUsuarioA  = document.getElementById("pusernameActu").value;
          var vCorreoA = document.getElementById("pCorreosActu").value;
          var vContrasenaA = document.getElementById("pContrasenasActu").value;

          
            console.log("el uri ingresado fue: "+vUriApiActu);
    
            console.log("El nombre es: "+vnombreA);
            console.log("La identificación es: "+videntificacionA);
            console.log("El nombre usuario es: "+vnombreUsuarioA);
            console.log("El correo es: "+vCorreoA);
            console.log("La contraseña es: "+vContrasenaA);
            
            if (!vContrasenaA){
              vContrasena = null;
            }
            

            f_a_consumirActualizar(vUriApiActu,vIdUser,videntificacionA,vnombreA,vnombreUsuarioA,vContrasenaA,vCorreoA);
           
    
        
         });

         $("#collapseSeven").on("click", "#btnLimpiarActu", function(){
          f_a_limpiarCampo("pidUsu");
          f_a_limpiarCampo("pnombreActu");
          f_a_limpiarCampo("pidentificacionActu");
          f_a_limpiarCampo("pusernameActu");
          f_a_limpiarCampo("pCorreosActu");
          f_a_limpiarCampo("pContrasenasActu");
       
        });


        
        // ---------------------------------------------------------------------------------------------------Fin del metodo Actualizar

      });