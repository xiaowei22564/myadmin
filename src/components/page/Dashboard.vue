<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>2019-11-01</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>东莞</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>项目进度</span>
                    </div>
                    <!-- <p v-for="(user ,i) in perc">{{user.speed}} </p> -->
                    <span v-for="user in perc">{{user.item}}<el-progress :percentage="setItemProgress(user)" color="#42b983"></el-progress></span>
                    
                    <!-- 订单管理系统
                    <el-progress :percentage=this.perc color="#42b983"></el-progress>仓储系统
                    <el-progress :percentage=this.perc1 color="#f1e05a"></el-progress>商品系统
                    <el-progress :percentage=this.perc2></el-progress>供应链系统
                    <el-progress :percentage=this.perc3 color="#f56c6c"></el-progress> -->
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">5000</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">添加</el-button>

                        <el-dialog title="添加议程" :visible.sync="dialogFormVisible">
                        <el-form>
                            <el-form-item label="议程名称" >
                            <el-input v-model="agenda" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="itemadd">确 定</el-button>
                        </div>
                        </el-dialog>

                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <label @click="handleupdate(scope.row.id,scope.row.status)">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                                </label>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                    class="todo-item"
                                    :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template slot-scope="scope">
                                <i class="el-icon-delete" @click="thingdeltitle(scope.row.id)"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <div id="main" style="width: 600px;height:400px;"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <div id="circular" style="width: 600px;height:400px;"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'dashboard',
    data() {
        return {
            perc:[],
            data:[],
            user:[],
            dialogFormVisible: false,
            agenda:null,
            name: localStorage.getItem('ms_username'),
            todoList: []
        };
    },

    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    methods: {

        myEcharts(){
        this.$axios.get(this.HOME+'/userdata').then(Response =>{
            this.data = Response.data.data;
            this.user = Response.data.user;
            }).then(res =>{
                var myChart = this.$echarts.init(document.getElementById('main'));
                myChart.setOption({
                    title: {
                        text:'本周BUG数量'
                    },
                    tooltip: {},
                    xAxis: {
                    data: this.user
                    },
                    yAxis: {},
                    series: [{
                    name: 'BUG数量',
                    type: 'bar',
                    data: this.data
                    }]
                })        
            });
        },
        drawLine(){
            this.$axios.get(this.HOME+'/circulardata').then(Response =>{
            this.data = Response.data.data;
            this.user = Response.data.user;
            }).then(res =>{
		  // 基于准备好的dom，初始化echarts实例
		  var myChart = this.$echarts.init(document.getElementById('circular'));

                // 指定图表的配置项和数据
            var option = {
                            title: {
                text: '本周BUG数量百分比',
                subtext: 'BUG',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: this.user
            },
            series: [
                {
                    name: 'bug数量',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: this.data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
            };

		  // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        });
    },
    item(){
        this.$axios.get(this.HOME+'/itemdata').then(Response =>{
            this.perc = Response.data;
            })
    },
    setItemProgress(data) {
                 if (data.speed > 100) {
                     return 100
                 } else {
                     return parseFloat(data.speed)
                 }
             },
    thing() {
        this.$axios.get(this.HOME+'/thingdata').then(Response =>{
            this.todoList = Response.data;
        })
    },
    handleupdate(id,status) {
        console.log(id);
        this.$axios.get(this.HOME+'/thingupdate',{
            params: {
          status:status,
          id:id
        }
        })
    },
    itemadd() {
        this.$axios.get(this.HOME+'/thingaddtitle',{
            params: {
          title:this.agenda
        }
        })
        this.dialogFormVisible = false;
        this.thing();
    },
    thingdeltitle(id){
        this.$axios.get(this.HOME+'/thingdeltitle',{
            params: {
          id:id
        }
        })
        this.thing();
    }
    },
  mounted() {
      this.myEcharts();
      this.drawLine();
      this.item();
      this.thing();
  }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
