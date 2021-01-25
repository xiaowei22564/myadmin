<template>
<div>
  <el-card shadow="hover">
  <el-input style="width:10%" v-model="vid"></el-input>
  <el-button @click="userdata">搜索</el-button>
  </el-card>
  <el-table
    :data="tableData"
    :border="true"
    style="width: 100%">
    <el-table-column
      prop="vid"
      label="vid"
      width="150%">
    </el-table-column>
    <el-table-column
      prop="r"
      label="r"
      width="100%">
    </el-table-column>
    <el-table-column
      prop="b"
      label="b"
      width="100%">
    </el-table-column>
    <el-table-column
      prop="swpd"
      label="swpd"
      width="100%">
    </el-table-column>
    <el-table-column
      prop="free"
      label="free"
      width="100%">
    </el-table-column>
    <el-table-column
      prop="buff"
      label="buff"
      width="100%">
    </el-table-column>
    <el-table-column
      prop="cache"
      label="cache"
      width="100%">
    </el-table-column>
        <el-table-column
      prop="si"
      label="si"
      width="50%">
    </el-table-column>
        <el-table-column
      prop="so"
      label="so"
      width="50%">
    </el-table-column>
        <el-table-column
      prop="bi"
      label="bi"
      width="50%">
    </el-table-column>
        <el-table-column
      prop="bo"
      label="bo"
      width="100%">
    </el-table-column>
        <el-table-column
      prop="ins"
      label="in"
      width="100%">
    </el-table-column>
        <el-table-column
      prop="cs"
      label="cs"
      width="100%">
    </el-table-column>
        <el-table-column
      prop="us"
      label="us"
      width="100%">
    </el-table-column>
        <el-table-column
      prop="sy"
      label="sy"
      width="100%">
    </el-table-column>
        <el-table-column
      prop="id"
      label="id"
      width="100%">
    </el-table-column>
        <el-table-column
      prop="wa"
      label="wa"
      width="50%">
    </el-table-column>
      <el-table-column
      prop="st"
      label="st"
      width="50%">
    </el-table-column>
  </el-table>

  <!-- <el-pagination
    :page-size="20"
    :pager-count="11"
    layout="prev, pager, next"
    :total=total>
  </el-pagination> -->

  <el-pagination background  
  @current-change="changePage"
  :page-size="20" 
  layout="total, prev, pager, next, jumper" 
  :total="total">
  </el-pagination>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        vid: '',
        pagenum:1,
        total:null
      }
    },
    created() {
        this.userdata()
    },
    methods :{
      userdata(){
      let data = {
            vid:this.vid,
            pagenum:this.pagenum,
      }
        this.$axios.post(this.HOME+'/selctvm',data).then(Request =>{
            this.tableData = Request.data.data;
            this.total = Request.data.count;
        }).catch(error => {
          console.log(error)
        })
    },

   //列表分页
    changePage(val) {
      this.pagenum = val;
      this.userdata(val);
    }
    }
  }
</script>