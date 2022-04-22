<template>
  <div class="container">
    <div class="wrap">
      <div class="menu-wrap">
        <button @click="openDialog()">弹窗</button>
        <button @click="openWindow()">新窗口</button>
        <button @click="openConfirm()">提示</button>
        <button @click="sendMessage()">消息</button>
        <button @click="openLoading()">loading</button>
      </div>
      <div class="js-webgl-globe-data">
        <div class="js-webgl-globe"></div>
      </div>
      <!--    <script crossorigin="anonymous" defer="defer" :src="webgl"></script>-->
      <h1 class="word"> Hello world! </h1>
      <img class="astro" :src="astroImg" alt=""/>
    </div>
    <div class="bottom">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" preserveAspectRatio="none" viewBox="0 0 1680 40" class="position-absolute width-full z-1" style="bottom: -1px;"><path d="M0 40h1680V30S1340 0 840 0 0 30 0 30z" fill="#fff"></path></svg>
      <div style="height: 60px;background: white;"></div>
    </div>
  </div>
</template>

<script>
import astroImg from '@/assets/images/astro-mona.svg'
import('@/assets/webgl.js')
export default {
  setup(){
    function openDialog(){
      window.electronAPI.$dialog({
        page: '/static/agreement.html',
        preload: 'dialog.js',
        cancelBtn: false
      }).then(r => {
        console.log(r)
      })
    }
    function openWindow(){
      window.electronAPI.openWindow({
        name: 'about',
        title: '关于我们',
        readyToShow: true,//渲染完成后显示页面
        page: '/about',
        width: 360,
        height: 500,
        minimizable: false,
        maximizable: false,
        resizable: false
      })
    }
    function readme(){
      window.electronAPI.openWindow({
        name: 'readme',
        title: 'README',
        readyToShow: true,
        page: '/readme',
        width: 800,
        height: 500,
      })
    }
    function openConfirm(){
      window.electronAPI.$confirm({
        title: '系统提示',
        message: '此操作将永久删除该文件, 是否继续?',
        cancelText: '取消',
        confirmText: '确认'
      }).then(r => {
        console.log(r)
      }).catch(e => {
        console.log('hi')
      })
    }
    function sendMessage(){
      window.electronAPI.$message('message')
    }
    let loading = false
    function openLoading(){
      loading ? window.electronAPI.$loading.close() : window.electronAPI.$loading.open()
      loading = !loading
    }
    return {
      astroImg,
      openDialog,
      openWindow,
      readme,
      openConfirm,
      sendMessage,
      openLoading
    }
  }
}
</script>

<style>
.d-none {
  display: none;
}

.js-webgl-globe-data{
  display: inline-block;
  position: absolute;
  right: 0;
  z-index: 1;
  /*top: 100px;*/
  box-sizing: border-box;
  height: 100%;
}

.js-webgl-globe {
  height: 900px;
  width: 900px;
}
</style>
<style scoped lang="scss">
.container{
  height: 100vh;
  width: 100%;
  background-color: #040d21;
  overflow: hidden;
}
.wrap{
  width: 80%;
  margin: 0 auto;
  position: relative;
  height: 100%;
}

.menu-wrap{
  position: relative;
  z-index: 100;
}
.word{
  color: white;
  font-size: 72px;
  line-height: 76px;
  position: absolute;
  top: 30%;
  left: 5%;
  width: 700px;
  z-index: 1;
}

.astro{
  position: absolute;
  right: 0;
  bottom: 0;
  width: 500px;
  z-index: 2;
}
.bottom{
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
}
.bottom svg{
  position: relative;
  top: 10px;
}
.back-img{
  width: 200%;
  /*height: 100%;*/
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
