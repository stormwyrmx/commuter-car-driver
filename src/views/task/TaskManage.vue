<script setup>
import {
    Edit,
    Delete, CircleCloseFilled, WarningFilled, SuccessFilled
} from '@element-plus/icons-vue'
import {
    addTaskService,
    deleteTaskService,
    listBusService,
    listDriverService,
    listTaskByPageService, updateTaskService
} from "@/api/task.js";
import { ref } from 'vue'
import {Plus} from '@element-plus/icons-vue'
import {ElMessage, ElMessageBox} from "element-plus";
import routeManage from "@/views/route/RouteManage.vue";
import {useRouter} from "vue-router";

//控制抽屉是否显示
const visibleDrawer = ref(false)

//添加表单数据模型
const taskModel = ref({
    id:'',
    time: '',
    driverId: '',
    routeId:'',
    number: '',
    busId:'',
    status:''
})

//添加文章/修改文章的标题
const title=ref()

//用户搜索时选中的路线号
const number=ref()

//用户搜索时选中的工单状态
const status=ref()

//用户搜索时选中的司机id
const driverId=ref()

//司机列表数据模型
const drivers = ref([])

//车辆列表数据模型
const buses = ref([])

//工单列表数据模型
const tasks = ref([])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(5)//每页条数

//查询司机信息
const listDriver = async () => {
    let result = await listDriverService();
    drivers.value = result.data;
}
listDriver()

//查询车辆信息
const listBus = async () => {
    let result = await listBusService();
    buses.value = result.data;
}
listBus()

//条件分页查询工单
const listTaskByPage= async ()=> {
    let taskPageRequest={
        current:pageNum.value,
        size:pageSize.value,
        driverId:driverId.value,
        number:number.value,
        status:status.value
    }
    let result = await listTaskByPageService(taskPageRequest);
    tasks.value = result.data.records;
    total.value = result.data.total;
}
listTaskByPage()

//回显工单
const showTask=(row)=>{
    taskModel.value.id=row.id
    taskModel.value.time=row.time
    taskModel.value.driverId=row.driverId
    taskModel.value.routeId=row.routeId
    taskModel.value.number=row.number
    taskModel.value.busId=row.busId
    taskModel.value.status=row.status

    visibleDrawer.value = true
    title.value = '编辑工单'
}
//清空工单模型
const clearTaskModel=()=> {
    taskModel.value.id=''
    taskModel.value.time=''
    taskModel.value.driverId=''
    taskModel.value.routeId=''
    taskModel.value.number=''
    taskModel.value.busId=''
    taskModel.value.status=''
}
//删除工单
const deleteTask=(row)=>{
    ElMessageBox.confirm(
        '你确认删除该工单吗?',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            await deleteTaskService(row.id)
            ElMessage({
                type: 'success',
                message: '删除成功'
            })
            await listTaskByPage()
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}

//当每页条数发生了变化，调用此函数
const onSizeChange = () => {
    listTaskByPage()
}

//当前页码发生变化，调用此函数
const onCurrentChange = () => {
    listTaskByPage()
}

//添加工单
const addTask = async () => {
    await addTaskService(taskModel.value);
    visibleDrawer.value = false
    ElMessage.success('添加成功')
    await listTaskByPage()
}

//修改工单
const updateTask=async ()=>{
    await updateTaskService(taskModel.value);
    visibleDrawer.value = false
    ElMessage.success('修改成功')
    await listTaskByPage()
}

//跳转到路线管理
const router=useRouter();
const navigateToRouteManage=(routeId)=>{
    router.push('/route/manage/'+routeId);
}

</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>工单管理</span>
                <div class="extra">
                    <el-button type="primary" @click="visibleDrawer=true;title='添加工单';clearTaskModel()">添加工单</el-button>
                </div>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="路线选择：">
                <el-select placeholder="请选择" v-model="number">
                    <el-option label="长安->友谊 西万路" :value="1"></el-option>
                    <el-option label="长安->友谊 西太路" :value="2"></el-option>
                    <el-option label="友谊->长安 西万路" :value="3"></el-option>
                    <el-option label="友谊->长安 西太路" :value="4"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="工单状态：">
                <el-select placeholder="请选择" v-model="status">
                    <el-option label="未分配" :value="0"></el-option>
                    <el-option label="已分配" :value="1"></el-option>
                    <el-option label="已执行" :value="2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="司机：">
                <el-select placeholder="请选择" v-model="driverId">
                    <el-option v-for="driver in drivers" :value="driver.id" :label="`id:${driver.id} ${driver.name} ${driver.username}`">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="listTaskByPage">搜索</el-button>
                <el-button @click="number=null;status=null;driverId=null">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 文章列表 -->
        <el-table :data="tasks" style="width: 100%">
            <el-table-column label="工单号" width="90" prop="id"></el-table-column>
            <el-table-column label="时间" width="200" prop="time"></el-table-column>
            <el-table-column label="路线" width="180" prop="number">
                <template #default="{ row }">
                    <span v-if="row.number === 1">长安->友谊 西万路</span>
                    <span v-else-if="row.number === 2">长安->友谊 西太路</span>
                    <span v-else-if="row.number === 3">友谊->长安 西万路</span>
                    <span v-else-if="row.number === 4">友谊->长安 西太路</span>
                </template>
            </el-table-column>
            <el-table-column label="车牌" prop="licensePlate"></el-table-column>
            <el-table-column label="司机id" width="90" prop="driverId"> </el-table-column>
            <el-table-column label="工号" prop="username"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="状态" prop="status">
                <template #default="{ row }">
                    <span v-if="row.status === 0">
                        <el-icon><CircleCloseFilled /></el-icon>
                        未分配
                    </span>
                    <span v-else-if="row.status === 1" style="color: green">
                        <el-icon><WarningFilled /></el-icon>
                        已分配
                    </span>
                    <span v-else @click="navigateToRouteManage(row.routeId)" style="color: blue;text-decoration: underline">
                        <el-icon><SuccessFilled /></el-icon>
                        已执行
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="showTask(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteTask(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[5 ,10, 15]"
                       layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
                       @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />

        <!-- 抽屉 -->
        <el-drawer v-model="visibleDrawer" :title=title direction="rtl" size="50%">
            <!-- 添加/编辑工单 -->
            <el-form :model="taskModel" label-width="100px" >
                <el-form-item label="时间" >
                    <el-input v-model="taskModel.time" placeholder="输入时间" style="width: 210px"></el-input>
                </el-form-item>
                <el-form-item label="司机">
                    <el-select placeholder="请选择" v-model="taskModel.driverId">
                        <el-option v-for="driver in drivers" :value="driver.id" :label="`id:${driver.id} ${driver.name} ${driver.username}`">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="路线">
                    <el-select placeholder="请选择" v-model="taskModel.number">
                        <el-option label="长安->友谊 西万路" :value="1"></el-option>
                        <el-option label="长安->友谊 西太路" :value="2"></el-option>
                        <el-option label="友谊->长安 西万路" :value="3"></el-option>
                        <el-option label="友谊->长安 西太路" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车辆">
                    <el-select placeholder="请选择" v-model="taskModel.busId">
                        <el-option v-for="bus in buses" :value="bus.id" :label="bus.licensePlate">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select placeholder="请选择" v-model="taskModel.status">
                        <el-option label="未分配" :value="0"></el-option>
                        <el-option label="已分配" :value="1"></el-option>
                        <el-option label="已执行" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="title==='添加工单'?addTask():updateTask()">确认</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </el-card>
</template>
<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .el-select{
        width: 210px;
    }

}
</style>