<template>
  <p>{{msg}}</p>
</template>

<script>

export default {
  name: 'game',
  props:['socket'],
  data () {
    return {
      msg:'game test'
    }
  }, 
  mounted() {
    //向伺服器發送的訊息，確認連接狀況良好
    this.socket.emit('condition',{condition:'game Client Connection!'});
    //接收伺服器發送的訊息，確認連接狀況良好
    this.socket.on('message', function(msg){
      console.log(msg.connection);
    });
  },
  methods:{
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>