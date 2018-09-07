<template>
  <div id="app">
    <router-view :socket="socket"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      //與伺服器建立連結
      socket : io.connect("http://192.168.30.117:8542"),
      memberData:{}
    }
  },
  mounted() {
    this.socket.on('memberData', function(data){
      console.log(data);
    });
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
