<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick()">
      <el-tab-pane label="年齡統計" name="first"></el-tab-pane>
      <el-tab-pane label="性別統計" name="second"></el-tab-pane>
      <el-tab-pane label="註冊人數" name="third"></el-tab-pane>
      <el-tab-pane label="國家統計" name="fourth"></el-tab-pane>
    </el-tabs>
    <ve-chart :data="chartData" :settings="chartSettings" :colors="color" :extend="extend"></ve-chart>
  </div>
</template>

<script>

var socket = io.connect('192.168.30.116:8888');
export default{
  data () {
    return {
      chartData: {
        columns: [],
        rows: []
      },
      activeName : 'first',
      chartSettings : {
        type : ''
      },
      extend : {

      },
      color : ['#5ab1ef','#fa6e86','#19d4ae','#ffb980','#0067a6','#c4b4e4'],
      showData : [],
      count : {
        countage : [],
        countsex : [],
        countcountry : [],
        counttime : []
      }
    }
  },
  mounted () {
    socket.on('getData',(data)=>{
      this.showData = data;
      //計算人數
      let countage = {};
      let countsex = {};
      let countcountry = {};
      let counttime = {};
      
      for(var value of this.showData){
        if(countage[value.age])
          countage[value.age]++;
        else
          countage[value.age] = 1;
        if(countsex[value.sex])
          countsex[value.sex]++;
        else
          countsex[value.sex] = 1;
        if(countcountry[value.country])
          countcountry[value.country]++;
        else
          countcountry[value.country] = 1;
        let time = new Date(value.regtime).toLocaleDateString();
        if(counttime[time])
          counttime[time]++;
        else
          counttime[time] = 1;
      }
      this.count.countage = countage;
      this.count.countsex = countsex;
      this.count.countcountry = countcountry;
      this.count.counttime = counttime;
      console.log(this.count);
    })
  },
  methods : {
    handleClick(){
      switch(this.activeName){
        case "first":
          this.set('pie',['年齡', '人數'],this.count.countage);
          break;
        case "second":
          this.set('pie',['性別', '人數'],this.count.countsex);
          break;
        case "third":
          this.set('line',['日期','人數'],this.count.counttime);
          break;
        case "fourth":
          this.set('histogram',['國家','人數'],this.count.countcountry);
          break;
      }
    },
    set(type,columns,rows){
      this.chartSettings['type'] = type;
      this.chartData['columns'] = columns;
      this.chartData['rows'] = [];
      for(var key in rows){
        var show = key;
        if(columns[0]=='年齡')  //顯示文字
          show += '歲';
        this.chartData['rows'].push({[columns[0]]:show,[columns[1]]:rows[key]});
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url("//unpkg.com/element-ui/lib/theme-chalk/index.css");
</style>
