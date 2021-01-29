<template>
  <div class="hello">
    <el-input style="width:20%" type="text" placeholder="输入城市" v-model="city" />
    <el-button @click="register">天气查询</el-button><br>

    <!-- <router-link to="/httprequest" >接口调试工具</router-link><br> -->

    <!-- <p v-html="weather"></p> -->
    <table v-show="boolean" class="hovertable">
      <caption style="caption-side:left">城市:{{city}} 注意事项:{{tips}}</caption>
      <tr>
        <th>日期</th>
        <th>最高气温</th>
        <th>最低气温</th>
        <th>风向</th>
        <th>天气</th>
      </tr>

      <tr v-for="weat in weather" onmouseover="this.style.backgroundColor='#ffff66';" onmouseout="this.style.backgroundColor='#d4e3e5';">
        <td >{{weat.date}}</td>
        <td >{{weat.high}}</td>
        <td >{{weat.low}}</td>
        <td >{{weat.fengxiang}}</td>
        <td >{{weat.type}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      city:null,
      weather:null,
      boolean:false,
      tips:null
    }
  },
  methods :{
    register(){
      this.$axios.get('http://wthrcdn.etouch.cn/weather_mini',{
        params: {
          city:this.city
        }
      })
      .then(Response =>{
      this.weather = Response.data.data.forecast;
      this.tips = Response.data.data.ganmao;
      this.boolean = true;

    console.log(Response.status);
    console.log(Response.statusText);
    console.log(Response.headers);
    console.log(Response.config);
    }).catch(error => {
          console.log(error)
    })
    }
  }
}
</script>

<style scoped>
table.hovertable {
    font-family: verdana,arial,sans-serif;
    font-size:11px;
    color:#333333;
    border-width: 1px;
    border-color: #999999;
    border-collapse: collapse;
}
table.hovertable th {
    background-color:#c3dde0;
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #a9c6c9;
}
table.hovertable tr {
    background-color:#d4e3e5;
}
table.hovertable td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #a9c6c9;
}
table {
    width: 100%;
    margin: auto;
}
</style>