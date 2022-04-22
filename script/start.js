const {exec} = require('child_process')

const log = console.log

const viteProcess = exec('vite')

viteProcess.stdout.on('data', log)
viteProcess.stderr.on('data', log)

const electronProcess = exec('electron .')
electronProcess.stdout.on('data', log)
electronProcess.stderr.on('data', log)
