// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

function iniciar(fotocelula) {
  const visor = fotocelula.querySelector(".fotocelula__visor strong");
  let time = 0;
  let intervalId;
  const tirosRast = 6;
  const segundosEsperaRast = 2;
  let running = false;
  let stopping = false;
  let start;
  let times;
  let wait;
  refreshDisplay();

  function refreshDisplay() {
    visor.innerHTML = time.toFixed(3);
  }

  function zerar() {
    time = 0;
    refreshDisplay();
  }

  function handleAgilidade() {
    if (stopping) {
      running = false;
      stopping = false;
      clearInterval(intervalId);
      window.fotocelula.sendTime([time]);
      refreshDisplay();
      return;
    }

    running = "ag";
    stopping = true;
    zerar();
    logicAgilidade();
  }

  function logicAgilidade() {
    start = Date.now();

    intervalId = setInterval(() => {
      time = (Date.now() - start) / 1000;
      refreshDisplay();
    }, 21);
  }

  function handleRast() {
    if (stopping) {
      times.push((Date.now() - start) / 1000);
      window.fotocelula.sendTime(times);
      running = false;
      stopping = false;
      clearInterval(intervalId);
      refreshDisplay();
      return;
    }

    if (!running) {
      zerar();
      running = "rast";
      logicRast();
    } else {
      if (wait) {
        return;
      }
      if (!times) {
        times = [];
      }

      times.push((Date.now() - start) / 1000);

      if (times.length === tirosRast - 1) {
        stopping = true;
      }

      start = Date.now();
      wait = true;
      zerar();
    }
  }

  function logicRast() {
    start = Date.now();

    intervalId = setInterval(() => {
      time = (Date.now() - start) / 1000;

      if (wait & (time >= segundosEsperaRast)) {
        wait = false;
        start = new Date();
        zerar();
        time = (Date.now() - start) / 1000;
      }

      refreshDisplay();
    }, 21);
  }

  fotocelula.addEventListener("click", event => {
    if (event.target.id === "btn-ag" && (!running || running === "ag")) {
      handleAgilidade();
    }

    if (event.target.id === "btn-rast" && (!running || running === "rast")) {
      handleRast();
    }

    if (event.target.id === "btn-yo" && (!running || running === "yo")) {
    }
  });
}

iniciar(document.querySelector("#fotocelula"));
