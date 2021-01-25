
<template>
<div>

  <el-card shadow="hover">
  <el-input style="width:10%" placeholder="姓名" v-model="name"></el-input>

  <el-input style="width:10%" placeholder="手机号" v-model="phone"></el-input>
  <el-button @click="userdata">搜索</el-button>

  <el-button @click="dialogFormVisible = true">新增</el-button>
  </el-card>

<el-dialog title="新增用户" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :before-close="handleClose">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户姓名" prop="name1" style="width: 50%;">
    <el-input v-model="ruleForm.name1"></el-input>
  </el-form-item>

  <el-form-item label="手机号" prop="phone1" style="width: 50%;">
    <el-input v-model="ruleForm.phone1"></el-input>
  </el-form-item>

  <el-form-item label="地址" prop="address" style="width: 50%;">
    <el-input v-model="ruleForm.address"></el-input>
  </el-form-item>

  <el-form-item label="年龄" prop="age" style="width: 50%;">
    <el-input v-model="ruleForm.age"></el-input>
  </el-form-item>

    <el-form-item label="性别" prop="sex">
    <el-radio-group v-model="ruleForm.sex">
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  </el-form-item>

  <el-form-item label="注册时间" required>
    <el-col :span="11">
      <el-form-item prop="date1">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="date2">
        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>

  <el-form-item v-if='id!= ""'>
    <el-button type="primary" @click="updateForm('ruleForm')">修改</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
  <el-form-item v-else>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>

</el-form>
</el-dialog>

  <el-table
    :data="tableData"
    :border="true"
    style="width: 100%">
    <el-table-column
      prop="name"
      label="姓名"
      width="200%">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号"
      width="200%">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="200%">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
      width="200%">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="200%">
    </el-table-column>
    <el-table-column
      prop="regdate"
      label="注册日期"
      width="200%"
      >
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>

  
</template>

<script>
import moment from 'moment'
  export default {
    data() {
      return {
          name: null,
          phone: null,
        tableData: [{
        }],
        dialogFormVisible: false,
        ruleForm: {
          name1: '',
          phone1: '',
          date1: '',
          date2: '',
          address: '',
          age: '',
          sex: ''
        },
        id:'',
        rules: {
          name1: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
          ],
          phone1: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          age: [
            { required: true, message: '请填写年龄', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
        this.userdata()
    },
  methods :{
    userdata(){
      let data = {
            name:this.name,
            phone:this.phone
      }
        this.$axios.post(this.HOME+'/selectuser',data).then(Request =>{
            this.tableData = Request.data;
        }).catch(error => {
          console.log(error)
        })
    },
    submitForm() {
      
      // let d1 = moment(this.ruleForm.date1).format('YYYY-MM-DD');
      let data = {
          name:this.ruleForm.name1,
          phone:this.ruleForm.phone1,
          address:this.ruleForm.address,
          age:this.ruleForm.age,
          sex:this.ruleForm.sex,
          regdate:moment(this.ruleForm.date1).format('YYYY-MM-DD ')+moment(this.ruleForm.date2).format('HH:mm:ss')
      }

          this.$axios.post(this.HOME+'/adduser',data).then(Request =>{
            this.dialogFormVisible=false;
            this.userdata();
        }).catch(error => {
          console.log(error)
        })
      },
      updateForm(){
          let data = {
          name:this.ruleForm.name1,
          phone:this.ruleForm.phone1,
          address:this.ruleForm.address,
          age:this.ruleForm.age,
          sex:this.ruleForm.sex,
          id:this.id,
          regdate:moment(this.ruleForm.date1).format('YYYY-MM-DD ')+moment(this.ruleForm.date2).format('HH:mm:ss')
      }

          this.$axios.post(this.HOME+'/updateuser',data).then(Request =>{
            this.dialogFormVisible=false;
            this.userdata();
        }).catch(error => {
          console.log(error)
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();

      },
      handleDelete(id){
        this.$axios.get(this.HOME+'/deleteuser',{
        params: {
          id:id
        }
      }).then(Request =>{
            this.userdata();
        }).catch(error => {
          console.log(error)
        })
      },
      handleClose() {
        this.dialogFormVisible  = false
        this.ruleForm.name1 =''
        this.ruleForm.phone1 =''
        this.ruleForm.address =''
        this.ruleForm.age =''
        this.ruleForm.sex =''
        this.id = ''

      },
      handleEdit(e){
        this.dialogFormVisible = true;
        this.id = e.id
        this.ruleForm.name1 = e.name
        this.ruleForm.phone1 = e.phone
        this.ruleForm.address = e.address
        this.ruleForm.age = e.age
        this.ruleForm.sex = e.sex
      }
  }
  }
</script>