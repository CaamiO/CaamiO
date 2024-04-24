//Inicializacion de variables
let tarjetasDestapadas = 0;
let movimientos = 0;
let aciertos = 0;
let tarjeta1;
let tarjeta2;
let primerResultado;
let segundoResultado;
let temporizador = false;
let timer = 40;
let tiempo = null;
let timerInicial = timer;
let tiempoHTML = document.getElementById('timer-value');
// Asignar el valor de timer al elemento HTML
tiempoHTML.textContent = timer;
//Apuntando a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tiempo');
//Generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros =numeros.sort(() => {
    return Math.random() - 0.5;
});
//Funciones
function contarTiempo(){
    tiempo = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer == 0){
            clearInterval(tiempo);
            bloquearTarjetas();
        }
    },1000);
}

function bloquearTarjetas(){ 
    for (let i = 0; i <= 15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="img/${numeros[i]}" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos} &#127919`;
        mostrarTiempo.innerHTML = `Tiempo agotado! Intenta de nuevo&#128170`;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
}
//Funcion principal
function destapar(id){
    if (temporizador == false){
        contarTiempo();
        temporizador = true;
    }
    
    tarjetasDestapadas++;
    if (tarjetasDestapadas == 1) {
        //Mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="img/${primerResultado}.png" alt="">`;
        //Deshabilitar primer boton
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {
        //Mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="img/${segundoResultado}.png" alt="">`;
        //Deshabilitar segundo boton
        tarjeta2.disabled = true;

        //Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
        if (primerResultado == segundoResultado) {
            tarjetasDestapadas = 0;
            //Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            if (aciertos == 8){
                clearInterval(tiempo);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} &#128561`;
                mostrarTiempo.innerHTML = `Ganaste! &#127881 Sólo demoraste ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} &#128079`;           
            }       
        } else {
            //Mostrar momentaneamente valores y volver a tapar
            setTimeout(() => {
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },600);
        }
    }
}
function reiniciarJuego() {
    // Reiniciar todas las variables al estado inicial
    tarjetasDestapadas = 0;
    movimientos = 0;
    aciertos = 0;
    temporizador = false;
    timer = timerInicial;
    // Detener y reiniciar el temporizador si está activo
    if (tiempo) {
        clearInterval(tiempo);
        tiempo = null;
    }
    // Restablecer la visualización de movimientos, aciertos y tiempo
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

    // Habilitar todas las tarjetas y eliminar cualquier contenido
    for (let i = 0; i <= 15; i++) {
        let tarjeta = document.getElementById(i);
        tarjeta.innerHTML = '';
        tarjeta.disabled = false;
        //Asociar la funcion destapar a cada tarjeta
        tarjeta1.addEventListener('click',function(){
        destapar(id);   
        // Volver a contar el tiempo si no estaba activo previamente
        if (!temporizador) {
            temporizador = true;
            contarTiempo();
            }
        });
    }
}
// Asociar la función de reinicio al evento click del botón
document.getElementById('reiniciar').addEventListener('click', reiniciarJuego);