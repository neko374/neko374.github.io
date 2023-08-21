<template>
  <el-affix :offset="0">
    <el-menu
      mode="horizontal"
      :router="true"
      :ellipsis="false"
      style="
        background-color: rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(3px);
      "
    >
      <el-menu-item index="index">
        <img src="../../assets/favicon.ico" width="56" height="56" />
      </el-menu-item>
      <div style="flex-grow: 1" />
      <el-menu-item index="table">表格数据</el-menu-item>
      <el-menu-item index="chart">图表大屏</el-menu-item>
      <el-menu-item index="editor">代码编辑</el-menu-item>
    </el-menu>
  </el-affix>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: rgb(102, 103, 171);
}
</style>