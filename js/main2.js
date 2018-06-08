
  function onclick() { 

    var el = document.getElementById("input");

if (el !== null && el.value === "")
{

  document.getElementById("demo").innerHTML = "Hello World";

}else{

  console.log("nada.");

}
  }

   /* 
         if ($('#input')== "si" {
                document.getElementById("demo").innerHTML = "Hello World";
          } else {}
        document.getElementById("demo").innerHTML = "Chau";
          }
*/

$(document).ready(function(){

       //  function init() {
  
  swal("Bienvenido!¿Cómo te llamas?", {
  content: "input",
})
.then((value) => {
  swal(` Preparate para jugar ${value} !`);
});

  var fotos = [
    {orden : 0,
      nombre : "cristo-redentor",
      src : "img/cristoredentor.jpg",
      descubierto : false
    },

    {orden : 1,
      nombre : "cristo-redentor",
      src : "img/cristoredentor.jpg",
      descubierto : false
    },

    {orden : 2,
      nombre : "ciudadpetra",
      src : "img/ciudadpetra.jpg",
      descubierto: false
    },

    {orden : 3,
      nombre : "ciudadpetra",
      src : "img/ciudadpetra.jpg",
      descubierto: false
    },

    {orden : 4,
      nombre : "tajmahal",
      src : "img/tajmahal.jpg",
      descubierto: false
    },

    {orden : 5,
      nombre : "tajmahal",
      src : "img/tajmahal.jpg",
      descubierto: false
    },

    {orden : 6,
      nombre : "coliseo",
      src : "img/coliseo.jpg",
      descubierto: false
    },

    {orden : 7,
      nombre : "coliseo",
      src : "img/coliseo.jpg",
      descubierto: false
    },

    {orden : 8,
      nombre : "murallachina",
      src : "img/murallachina.jpg",
      descubierto: false
    },

    {orden : 9,
      nombre : "murallachina",
      src : "img/murallachina.jpg",
      descubierto: false
    },

    {orden : 10,
      nombre : "piramides",
      src : "img/piramides.jpg",
      descubierto: false
    },

    {orden : 11,
      nombre : "piramides",
      src : "img/piramides.jpg",
      descubierto: false
    },
  ]
/*
** SHUFFLE
*/
  function shuffle(a){ 
    var j, x, i;

    for(i = a.length -1; i > 0; i--){

      j = Math.floor(Math.random()*(i+1));

      x = a[i];
      a [i] = fotos[j];
      a [j] = x;
    }
    return a;
  }

  var desorden = shuffle(fotos);

  var primer = true;
  var contador = 0;
  var intentos = 24;
  var parejas = 6;
  var anterior;
  var actual;
  var sour1;
  var sour2;

  $(".ficha").on('click', function(){

    //primero chequeamos si descubierto ya ha sido cambiado a true. Evito que la imagen se compare con ella misma.

    var id_global = $(this).attr('id');
    if(desorden[id_global].descubierto){
      return ; //todo lo que este debajo no se va a ejecutar si se cumple la condicion.
    }
        /*OTRO MODO :-)

        **var src = $(this).attr('src');
        ** if(src != "img/back.jpg"){
              return;
            }
        */

    //DOY VUELTA LA IMAGEN Y LO "NOTIFICO"    
    if (contador < 2 ){ 

      if (primer == true) {
        anterior = $(this);
        //var ant = desorden[id].nombre;
        let id = anterior.attr('id');
        anterior.attr('src', desorden[id].src); //estoy cambiando la imagen,la sustituyo por la foto.
        var source = desorden
        sour1 = desorden[id].nombre;
        primer = false;
        contador++; //me asegura que no de vuelta mas de dos cartas.
        desorden[id].descubierto = true;
      }else{ // di vuelta las dos
        actual = $(this);
        let id = actual.attr('id');
        actual.attr('src', desorden[id].src);
        sour2 = desorden[id].nombre;
        primer = true;
        contador++;
        console.log(sour1)

        console.log(sour2)
        if (sour1 == sour2) {

          let id_anterior = anterior.attr('id');
          let id_actual = actual.attr('id');
          desorden[id_anterior].descubierto = true;  //cambiamos el atributo descubierto (inicializado en false)
          desorden[id_actual].descubierto = true;
          parejas-=1; //descuento una pareja por descubrir

          /*
          **CHEQUEO PRIMERO SI GANE ANTES DE CHEQUEAR SI PERDI.
          */
          if(parejas == 0){//cuando ya descubri todas las parejas
            setTimeout(function(){
             // alert("ganaste");
              swal({
                  title: "Buen Trabajo!",
                  text: "Ganaste!",
                  icon: "success",
                  button: "Entendido!",
                }) .then((value) => {
                init();
              });;


            },750)
          }
          else if (intentos == 0){
            setTimeout(function(){
              //alert("perdiste");
               swal({
                  title: "Perdiste!",
                  text: "Te quedaste sin intentos.Sera la próxima!",
                  icon: "error",
                  button: "Entendido!",
                });

            },750)
          }
          contador = 0; //ver arriba.
        }else {
          setTimeout(function(){
            anterior.attr('src', "img/back.jpg"); //primera imagen
            actual.attr('src', "img/back.jpg"); //segunda imagen
            if (intentos == 0){

                swal({
                  title: "Perdiste!",
                  text: "Te quedaste sin intentos.Sera la próxima!",
                  icon: "error",
                  button: "Entendido!",
                })  
                
            }
            contador = 0;
          }, 1000);
          let id_anterior = anterior.attr('id');
          desorden[id_anterior].descubierto = false;  //cambiamos el atributo descubierto (inicializado en false)
        }
        intentos -= 1;

      }
    }
  });

});