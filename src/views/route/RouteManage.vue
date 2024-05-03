<script setup>
import {useRoute, useRouter} from 'vue-router';
import {ref} from "vue";
import {getRouteByIdService} from "@/api/route.js";

const route = useRoute();
const router = useRouter();

const goBack = () => {
    router.back();
}

//路线列表数据模型
const routeModel = ref({
    id: '',
    number: '',
    changan: '',
    dongmen: '',
    guojiyi:'',
    ziwei: '',
    gaoxin: '',
    laodong: '',
    youyi: '',
    yun:'',
    jiaoxi:'',
    hai:'',
    qixiang:''
})

//根据routeId查询路线表
const getRouteById = async () => {
    let result = await getRouteByIdService(route.params.id);
    routeModel.value = result.data;
    console.log(routeModel.value)
}
getRouteById()

</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>
                    路线记录(
                    {{routeModel.number===1?'长安->友谊 西万路':routeModel.number===2?'长安->友谊 西太路':routeModel.number===3?'友谊->长安 西万路':routeModel.number===4?'友谊->长安 西太路':'未知'}}
                    路线ID:{{routeModel.id}}
                    路线号:{{routeModel.number}}
                    )
                </span>
                <el-button type="primary" @click="goBack">返回</el-button>
            </div>
        </template>
        <!-- 路线列表 -->
        各上车点上车人数
        <el-table :data="[routeModel]" style="width: 100%">
            <el-table-column prop="changan" label="长安校区" v-if="routeModel.number===1||routeModel.number===2"></el-table-column>
            <el-table-column prop="dongmen" label="长安校区东门" v-if="routeModel.number===1||routeModel.number===2"></el-table-column>
            <el-table-column prop="guojiyi" label="国际医学中心" v-if="routeModel.number===4"></el-table-column>
            <el-table-column prop="ziwei" label="紫薇站" v-if="routeModel.number===3"></el-table-column>
            <el-table-column prop="gaoxin" label="高新站" v-if="routeModel.number===3"></el-table-column>
            <el-table-column prop="youyi" label="友谊校区" v-if="routeModel.number===3||routeModel.number===4"></el-table-column>
        </el-table>

        <br>
        <br>
        
        各下车点下车人数
        <el-table :data="[routeModel]" style="width: 100%">
            <el-table-column prop="dongmen" label="长安校区东门" v-if="routeModel.number===3||routeModel.number===4"></el-table-column>
            <el-table-column prop="guojiyi" label="国际医学中心" v-if="routeModel.number===2"></el-table-column>
            <el-table-column prop="ziwei" label="紫薇站" v-if="routeModel.number===1"></el-table-column>
            <el-table-column prop="gaoxin" label="高新站" v-if="routeModel.number===1"></el-table-column>
            <el-table-column prop="laodong" label="劳动路站" v-if="routeModel.number===1||routeModel.number===2"></el-table-column>
            <el-table-column prop="youyi" label="友谊校区" v-if="routeModel.number===1||routeModel.number===2"></el-table-column>
            <el-table-column prop="yun" label="云天苑" v-if="routeModel.number===3||routeModel.number===4"></el-table-column>
            <el-table-column prop="jiaoxi" label="教学西楼" v-if="routeModel.number===3||routeModel.number===4"></el-table-column>
            <el-table-column prop="hai" label="海天苑" v-if="routeModel.number===3||routeModel.number===4"></el-table-column>
            <el-table-column prop="qixiang" label="启翔楼" v-if="routeModel.number===3||routeModel.number===4"></el-table-column>
        </el-table>

    </el-card>

</template>

<style scoped lang="scss">
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>