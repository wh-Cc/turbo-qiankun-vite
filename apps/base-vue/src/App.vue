<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { onMounted } from 'vue';

import { start, registerMicroApps } from "qiankun";

	// 1. 要加载的子应用列表
	const apps = [
		{
			name: "sub-vue", // 子应用的名称
			entry: "//localhost:5001", // 默认会加载这个路径下的html，解析里面的js
			activeRule: "/sub-vue", // 匹配的路由
			container: "#sub-container", // 加载的容器
		},
		{
			name: "sub-react", // 子应用的名称
			entry: "//localhost:5002", // 默认会加载这个路径下的html，解析里面的js
			activeRule: "/sub-react", // 匹配的路由
			container: "#sub-container", // 加载的容器
		},
	];

	// 2. 注册子应用
	registerMicroApps(apps, {
		beforeLoad: [async (app) => console.log("before load", app.name)],
		beforeMount: [async (app) => console.log("before mount", app.name)],
		afterMount: [async (app) => console.log("after mount", app.name)],
	});

	onMounted(() => {
		start();
	});
</script>

<template>
  <div id="sub-container"></div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
