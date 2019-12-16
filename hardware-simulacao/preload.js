// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { ipcRenderer } = require("electron");

window.fotocelula = {
  sendTime() {
    return ipcRenderer.sendSync("synchronous-message", ...arguments);
  }
};
