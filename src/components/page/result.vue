<template>
  <el-row>
    <el-col>
        <el-card>
        <el-button type="primary" @click="runload">执行</el-button>

        <el-button type="primary" @click="dialogFormVisible = true">编辑</el-button>

        <el-dialog title="添加被压测服务器信息" :visible.sync="dialogFormVisible" style="width: 80%;">
        <el-form>

        <el-form-item label="服务器地址" prop="home" style="width: 50%;">
        <el-input v-model="linuxdata.home"></el-input>
        </el-form-item>

        <el-form-item label="用户名" prop="user" style="width: 50%;">
        <el-input v-model="linuxdata.user"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass" style="width: 50%;">
        <el-input v-model="linuxdata.pass"></el-input>
        </el-form-item>

        <el-form-item label="执行命令" prop="cmd" style="width: 50%;">
        <el-input v-model="linuxdata.cmd"></el-input>
        </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
        </el-dialog>        

        </el-card>
    </el-col>

      <el-col :span="12">
            <el-card shadow="hover">
                <textarea placeholder="response内容" v-html="textarea" style="margin: 0px; width: 750px; height: 689px;">
                </textarea>
            </el-card>
      </el-col>
      <el-col :span="12">
            <el-card shadow="hover">
                <textarea placeholder="response内容" v-model="textarea1" style="margin: 0px; width: 700px; height: 689px;">
                </textarea>
            </el-card>
    </el-col>
  </el-row>

</template>

<script>
export default {
  name: 'result',
  data () {
    return {
      linuxdata:{
          home:'192.168.203.3',
          user:'root',
          pass:'root',
          cmd:'vmstat 1 10'
      },
      dialogFormVisible:false,
      textarea1:null,
      textarea:null
    }
  },
  methods :{
    runload(){
      this.$axios.post(this.HOME+'/vmstat',{
          host:this.linuxdata.home,
          user:this.linuxdata.user,
          pass:this.linuxdata.pass,
          cmd:this.linuxdata.cmd
      })
      .then(Response =>{
      let {threaddump,...params} = Response.data.data;
      this.textarea = params;
      this.textarea1 = Response.data.data.threaddump;
    }).catch(error => {
          console.log(error)
    })
    }
  }
}
</script>