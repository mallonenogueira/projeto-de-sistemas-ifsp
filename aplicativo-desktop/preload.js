const { ipcRenderer } = require("electron");

function create() {
  const listeners = [];

  return {
    add(callback) {
      listeners.push(callback);
    },

    clear() {
      if (!listeners.length) return;

      listeners.splice(0, listeners.length);
    },

    notify(times) {
      listeners.forEach(callback => {
        try {
          callback([...(times || [])]);
        } catch (err) {
          console.log("AQUI DEU RUIM:", err);
        }
      });
    }
  };
}

window.serialData = {
  porta: "/dev/pts/2",
  velocidade: 19200
};

window.timesListener = create();

ipcRenderer.on("send-times", (event, times) => {
  window.timesListener.notify(times);
});
