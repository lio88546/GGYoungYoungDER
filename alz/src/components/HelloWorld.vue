<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
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
export default {
  data () {
    return {
      chartData: {
        columns: [],
        rows: [
          
        /* { '性別':'男', '國家':'台灣' , '年齡':20 , '日期':'2018-01-01'},
          { '性別':'女', '國家':'俄羅斯' , '年齡':18 , '日期':'2018-01-02'},
          { '性別':'男', '國家':'台灣' , '年齡':16 , '日期':'2018-01-03'} */
          /* {'年份':'2017' , '人數':'1000'},
          {'年份':'2018' , '人數':'2000'},
          {'年份':'2019' , '人數':'1500'} */
        ]
      },
      activeName : 'first',
      chartSettings : {
        type : ''
      },
      extend : {

      },
      color : ['#5ab1ef','#fa6e86','#19d4ae','#ffb980','#0067a6','#c4b4e4']
    }
  },
  methods : {
    handleClick(){
      if(this.activeName=='first'){
        this.chartSettings['type'] = 'pie';
        this.chartData['columns'] = ['年齡', '人數'];
        this.chartData['rows'] = [
          {'年齡':'19歲以下' , '人數':3859},
          {'年齡':'20歲-24歲' , '人數':4876},
          {'年齡':'25歲-29歲' , '人數':9487},
          {'年齡':'30歲-34歲' , '人數':6666},
          {'年齡':'35歲-39歲' , '人數':2345},
          {'年齡':'40歲以上' , '人數':1314}];
      }
      else if(this.activeName=='second'){
        this.chartSettings['type'] = 'pie';
        this.chartData['columns'] = ['性別', '人數'];
        this.chartData['rows'] = [
          {'性別':'男' , '人數':38590},
          {'性別':'女' , '人數':13140}];
      }

      else if(this.activeName=='third'){
        this.chartSettings['type'] = 'line';
        this.chartData['columns'] = ['年月','人數'];
        this.chartData['rows'] = [
          {'年月':'2017-06','人數':1894},
          {'年月':'2017-07','人數':4381},
          {'年月':'2017-08','人數':3051},
          {'年月':'2017-09','人數':1032},
          {'年月':'2017-10','人數':2031},
          {'年月':'2017-11','人數':1203}
        ]
      }

      else if(this.activeName=='fourth'){
        this.chartSettings['type'] = 'histogram';
        this.chartData['columns'] = ['國家','人數'];
        this.chartData['rows'] = [
          {'國家':'台灣','人數':5487},
          {'國家':'中國','人數':9487},
          {'國家':'日本','人數':6666},
          {'國家':'韓國','人數':7777},
          {'國家':'泰國','人數':4444}
        ]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url("//unpkg.com/element-ui/lib/theme-chalk/index.css");
</style>
