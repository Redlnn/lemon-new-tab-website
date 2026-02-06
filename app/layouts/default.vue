<template>
  <global-nav />
  <div class="main-container h-[100dvh]">
    <el-scrollbar>
      <slot />
    </el-scrollbar>
    <el-backtop target=".main-container .el-scrollbar__wrap"></el-backtop>
  </div>
</template>
