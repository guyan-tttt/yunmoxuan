<template>
  <div>
    <el-card>
      <SourceCategory>
        <template v-slot="{ data }">
          <el-tabs type="border-card" class="demo-tabs" style="width: 100%; margin-top: 20px">
            <el-tab-pane class="xcacxacx" v-for="item in data" :key="item._id" :label="item.name" @dblclick="console.log('dadad')">
              <ul class="list">
                <li class="item" />
              </ul>
            </el-tab-pane>
          </el-tabs>
        </template>
      </SourceCategory>
    </el-card>
  </div>
</template>

<script setup>
import SourceCategory from "./components/SourceCategory.vue"
</script>

<style lang="scss" scoped>
::v-deep(.el-tabs__item.is-top.is-active) {
  border-radius: 15px;
  background-color: #409eff;
  color: #fff;
  &:hover {
    color: #f8ec48;
  }
}
::v-deep(.el-tabs__nav-scroll) {
  background-color: #fff;
}
::v-deep(.el-tabs--border-card) {
  border: 0;
}
</style>
