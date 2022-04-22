const {exec} = require('child_process')
const {join} = require('path')
const {name} = require('../package.json')
const {opendirSync} = require('fs')
const log = console.log
const {out, platform, arch, source, icon, ignore, version} = require('../build.config')

async function check(){
  //检查安装包
  const dir = opendirSync(join(__dirname,'../',source))
  for await (const dirent of dir) {
    if(/^electron-v.*.zip$/.test(dirent.name)){
      //找到安装包目录
      return true
    }
  }
  return false
}

async function build() {
  if (!await check()) {
    console.debug('\x1B[31m%s\x1B[39m', '请下载安装包至source目录')
    console.log('\x1B[31m%s\x1B[39m', '[windows64安装包下载](https://registry.npmmirror.com/-/binary/electron/15.0.0/electron-v15.0.0-win32-x64.zip)')
    return
  }

//electron-packager . app --out=./dist --platform=win32 --arch=x64 --overwrite --electron-zip-dir=./source --icon=./static/favicon.ico --ignore=node_modules --ignore=source --ignore=src
  let _ignore = ignore.map(item => `--ignore=${item}`)
  const args = [
    name,
    `--out=${join(out)}`,
    `--platform=${platform}`,
    `--arch=${arch}`,
    '--overwrite',
    `--electron-version ${version}`,
    `--electron-zip-dir=${join(source)}`,
    `--icon=${join(icon)}`,
    ..._ignore
  ]
  const command = `electron-packager . ${args.join(' ')}`
  const electronProcess = exec(command)
  electronProcess.stdout.on('data', log)
  electronProcess.stderr.on('data', log)
  electronProcess.on('close', buildWeb)

  async function buildWeb() {
    const dir = opendirSync(join(__dirname,'../',out))
    let electron
    for await (const dirent of dir) {
      if(dirent.name.indexOf(name) !== -1){
        //找到electron打包后的目录
        electron = dirent.name
        break
      }
    }
    /**
     * 打包web并指定输出目录到electron中
     */
    const webProcess = exec(`vite build --outDir=${join(`./${out}/${electron}/resources/app/build`)}`)
    webProcess.stdout.on('data', log)
    webProcess.stderr.on('data', log)
    webProcess.on('close', async () => {
      console.log('打包完成')
    })
  }
}

build()
