<template>
  <div id="con">
    <div id="regs" v-if="member.act=='regs'">
      <h2>註冊會員</h2>
      <p>帳號/暱稱：</p>
      <el-input style="width:20em" v-model="registerData.name" placeholder="請輸入帳號/暱稱"></el-input>
      <br>
      <p>密碼：</p><el-input type="password" style="width:20em" v-model="registerData.psw" placeholder="請輸入密碼"></el-input>
      <br>
      <p>本名：</p><el-input type="text" style="width:20em" v-model="registerData.realName" placeholder="請輸入您的本名"></el-input>
      <br>
      <p>性別：</p>
      <el-radio v-model="registerData.sex" label="male">男</el-radio>
      <el-radio v-model="registerData.sex" label="female">女</el-radio>
      <el-radio v-model="registerData.sex" label="other">中性</el-radio>
      <br>
      <p>年齡：</p>
      <el-select v-model="registerData.age" placeholder="請選擇年齡區間">
        <el-option
          v-for="item in ageOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <br>
      <p>地址：</p><el-input type="text" style="width:20em" v-model="registerData.adddress" placeholder="請輸入地址"></el-input>
      <br>
      <p>電話：</p><el-input type="text" style="width:20em" v-model.number="registerData.phone" placeholder="請輸入您的本名"></el-input>
      <br>
      <p>國家：</p>
      <el-select v-model="registerData.country" placeholder="請選擇國家">
        <el-option
          v-for="item in countryOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <br><br>
      <button @click="member.act='login'">返回</button> <button @click="regs()">註冊</button>
    </div>
    <div id="login" else v-if="member.act=='login'">
      <h2>會員登入</h2>
      <p>帳號/暱稱：</p>
      <el-input style="width:20em" v-model="loginData.name" placeholder="請輸入帳號/暱稱"></el-input>
      <br>
      <p>密碼：</p><el-input type="password" style="width:20em" v-model="loginData.psw" placeholder="請輸入密碼"></el-input>
      <br><br>
      <button @click="member.act='regs'">註冊</button> <button @click="login()">登入</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'logReg',
  data () {
    return {
      loginData:{
        task:"",
        name:"",
        psw:""
      },
      registerData:{
        task:"",
        name:"",
        psw:"",
        realName:"",
        sex:"",
        age:"",
        adddress:"",
        phone:"",
        country:""
      },
      ageOptions: [{
        value: '<=19',
        label: '19歲(含)以下'
      }, {
        value: '20~24',
        label: '20至24歲'
      }, {
        value: '25~29',
        label: '25至29歲'
      }, {
        value: '30~34',
        label: '30至34歲'
      }, {
        value: '35~39',
        label: '35至39歲'
      }, {
        value: '>=40',
        label: '40歲(含)以上'
      }],
      countryOptions:[{
        value: 'taiwan',
        label: '台灣'
      }, {
        value: 'china',
        label: '中國'
      }, {
        value: 'japan',
        label: '日本'
      }, {
        value: 'USA',
        label: '美國'
      }, {
        value: 'korea',
        label: '韓國'
      }, {
        value: 'rome',
        label: '羅馬'
      }],
      member:{
        is_member:false,
        act:"login",
        hint:"",
      }
    }
  },
  methods:{
    regs(){
      console.log(this.registerData);
      if(false){

        

        //至server處理
        //this.inputData.task = "regs";
        //socket.emit('regs',this.memberData);
      } else {
        alert("ERROR");
      }
    },

    login(){
      console.log(this.loginData);
      if(false){
        
        //this.inputData.task = "login";
        //socket.emit('login',this.inputData);
      } else {
        alert("請輸入暱稱與密碼以進行登入");
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #regs, #login{
    width: 50%;
    margin:auto;
    
  }

  #login {
    line-height: 3;
  }


  #regs p, #login p {
    display: inline;
  }
</style>
