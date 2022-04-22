const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../static/favicon.ico')
  })

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../build/index.html'))
  } else {
    win.loadURL('http://127.0.0.1:9527')
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
