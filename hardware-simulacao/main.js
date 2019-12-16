// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const SerialPort = require("serialport");

// Mensagem: "ID F000 [R000.000] [P000.000] T000.000"

const serial = {
  porta: "/home/mallone/dev/ttyS21",
  velocidade: 19200
};

const port = new SerialPort(
  serial.porta,
  { baudRate: serial.velocidade },
  err => !err || console.log("Error: ", err.message)
);

ipcMain.on("synchronous-message", (event, times) => {
  let string = times.reduce((arr, time, index) => {
    const letra = index === times.length - 1 ? "T" : "P";

    return arr + letra + time + " ";
  }, "");

  port.write("ID F000 " + string);
  console.log("ID F000 " + string);

  event.returnValue = "ok";
});

ipcMain.on("close-application", event => {
  app.quit();
  event.returnValue = "ok";
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 520,
    height: 330,
    // frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
