<template>
  <div class="page">
    <Header></Header>
    <div class="down">
      <div class="inp">
        模型号：<el-input
          style="width: 200px"
          size="small"
          v-model="name"
        ></el-input>
        模型名：<el-input
          style="width: 200px"
          size="small"
          v-model="number"
        ></el-input>
        <el-button
          type="primary"
          style="margin-left: 10px; width: 80px"
          size="small"
        >
          查询
        </el-button>
      </div>
      <div style="padding: 20px 0 20px 20px">
        <span style="margin-right: 15px; cursor: pointer" @click="add">
          <el-icon color="black"><CirclePlus /></el-icon> 添加
        </span>
        <span style="margin-right: 15px; cursor: pointer" @click="del"
          ><el-icon color="black"><Delete /></el-icon> 删除</span
        >
      </div>
      <el-table
        :data="dataList"
        size="small"
        stripe
        height="80%"
        v-loading="loading"
      >
        <el-table-column
          align="center"
          type="selection"
          header-align="center"
          width="50"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="number"
          show-overflow-tooltip
          label="模型编号"
          width="200"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          show-overflow-tooltip
          label="模型名称"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="equClassifyName"
          show-overflow-tooltip
          label="所属设备"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="majorName"
          show-overflow-tooltip
          label="专业"
        >
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          fixed="right"
          width="150"
          label="操作"
        >
          <template v-slot="scope">
            <span
              style="color: #1791ff; cursor: pointer"
              @click="edit(scope.row)"
              >编辑</span
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增弹框 -->
    <el-dialog
      title="模型库"
      close-on-press-escape
      v-model="show1"
      width="30%"
      style="height: 80%"
    >
      <el-form>
        <el-form-item style="display: block">
          <div style="width: 16%; display: inline-block">模型名称：</div>
          <el-select style="width: 80%" v-model="addmodel.name">
            <el-option value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="display: block">
          <div style="width: 16%; display: inline-block">设备分类id：</div>
          <el-select style="width: 80%" v-model="addmodel.equClassifyId">
            <el-option value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="display: block">
          <div style="width: 16%; display: inline-block">专业id：</div>
          <el-select style="width: 80%" v-model="addmodel.majorId">
            <el-option value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="display: block">
          <div style="width: 16%; display: inline-block">行业id：</div>
          <el-input style="width: 80%" v-model="addmodel.tradeId"></el-input>
        </el-form-item>
        <el-form-item style="display: block">
          <el-button
            type="primary"
            style="float: right; margin: 20px; width: 100px"
          >
            {{ this.ok }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "../../components/header/header.vue";
var dataList = ref([
  {
    number: "1",
    name: "1",
    equClassifyName: "1",
    majorName: "1",
  },
]);
var show1 = ref(false);
var addmodel = ref({
  name: "",
  equClassifyId: "",
  majorId: "",
  tradeId: "",
  id: "",
});
var name = ref(""); //搜索
var number = ref("");
var ok = ref("添加");
var pageNo = ref(1);
var pageSize = ref(10);
var total = ref(0);
var dataListSelections = []; //多选
var loading = ref(false);
var add = () => {
  show1.value = true;
};
</script>
  
<style scoped>
.page {
  width: 100%;
  height: 100%;
  background: white;
}

.down {
  width: 100%;
  height: 80%;
}

.inp {
  border-bottom: 0.1px solid rgb(218, 213, 213);
  padding-left: 20px;
  padding-bottom: 20px;
  padding-top: 20px;
}

.codel {
  float: left;
  width: 70%;
  height: 70vh;
  padding-top: 10px;
  overflow: hidden;
  box-sizing: border-box;
}

.dev {
  width: 30%;
  height: 100%;
  padding: 20px;
  float: right;
}
</style>