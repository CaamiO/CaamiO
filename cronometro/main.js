let hr = min = sec = ms = "0" + 0, startTimer;

const startBtn = document.querySelector(".iniciar"),
    stopBtn = document.querySelector(".parar"),
    resetBtn = document.querySelector(".reiniciar");

startBtn.addEventListener("click", iniciar);
stopBtn.addEventListener("click", parar);
resetBtn.addEventListener("click", reiniciar);

function iniciar () {
    startBtn.classList.add("active");
    stopBtn.classList.remove("stopActive");

    startTimer = setInterval(() => {
        ms++;
        ms = ms < 10 ? "0" + ms : ms;

        if (ms == 100) {
            sec++;
            sec = sec < 10 ? "0" + sec : sec;
            ms = "0" + 0;
        }

        if (sec == 60) {
            min++;
            min = min < 10 ? "0" + min : min;
            sec = "0" + 0;
        }

        if (min == 60) {
            hr++;
            hr = hr < 10 ? "0" + hr : hr;
            min = "0" + 0;
        }

        putValue();
    }, 10);
}

function parar() {
    startBtn.classList.remove("active");
    stopBtn.classList.remove("stopActive");
    clearInterval(startTimer);
}

function reiniciar () {
    startBtn.classList.remove("active");
    stopBtn.classList.remove("stopActive");
    clearInterval(startTimer);
    hr = min = sec = ms = "0" + 0;
    putValue();
}

function putValue() {
    document.querySelector('.milisegundos').innerHTML = ms;
    document.querySelector('.segundos').innerHTML = sec;
    document.querySelector('.minutos').innerHTML = min;
    document.querySelector('.horas').innerHTML = hr;
}