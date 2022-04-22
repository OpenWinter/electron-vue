const {exec} = require('child_process')

function callback(data) {
  console.log(data)
}

const viteProcess = exec('vite')

viteProcess.stdout.on('data', callback)
viteProcess.stderr.on('data', callback)

const electronProcess = exec('set NODE_ENV=development&& electron .')
electronProcess.stdout.on('data', callback)
electronProcess.stderr.on('data', callback)
