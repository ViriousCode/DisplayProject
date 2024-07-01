<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
body,#app{
  width: 100%;
  height: 100%;
}
::-webkit-scrollbar{
  width: 6px;
  background: rgb(0, 0, 0);
}
::-webkit-scrollbar-thumb{
  background: white;
}
</style>
