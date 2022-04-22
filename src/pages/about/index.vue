<template>
  <div>
    <div class="logo-wrap">
      <img :src="logo" alt=""/>
      <div class="info">
        <span id="name">{{name}}</span>
        <span id="version">{{version}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/images/logo.png'
import {name,version} from '../../../package.json'

export default {
  name: "index",
  setup(){
    return{
      logo,
      name,
      version
    }
  }
}
</script>

<style scoped>
.logo-wrap{
  text-align: center;
  padding-top: 100px;
}
.logo-wrap img{
  width: 150px;
}
.info{
  margin-top: 40px;
  font-size: 28px;
}
</style>
