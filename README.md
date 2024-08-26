# turborepo 和 qiankun 配合使用

Turborepo 是一个现代的多人协作开发工具，它允许你构建、管理和优化多个包和应用。Turborepo 的核心是一个强大的构建系统，它使用 Rust 编写的 Turbopack 作为其构建引擎。Turborepo 非常适合管理微前端架构中的多个独立应用。

qiankun 是一个流行的微前端框架，它允许你将多个独立的前端应用组合成一个整体，实现应用的独立开发和统一部署。

结合使用 Turborepo 和 qiankun 可以带来以下好处：

1. **独立开发**：每个微前端应用可以作为独立的包在 Turborepo 中进行开发和管理。
2. **统一构建**：Turborepo 可以统一构建所有微前端应用，确保构建效率和一致性。
3. **高效部署**：Turborepo 支持并行构建，加快部署流程。
4. **动态加载**：qiankun 支持在主应用中动态加载微应用，实现应用的按需加载。

以下是使用 Turborepo 和 qiankun 搭建微前端架构的步骤：

1. **初始化 Turborepo 工作区**：
   使用 `pnpm dlx create-turbo@latest` 初始化一个新的 Turborepo 工作区。

   ```bash
   ? Where would you like to create your Turborepo? turbo-qiankun-project
   ? Which package manager do you want to use? pnpm
   ```

2. **添加微应用**：
   在 Turborepo 工作区中添加多个微应用作为子包。

3. **配置构建**：
   为每个微应用配置 Turborepo 的 `turbod` 脚本，定义如何构建每个微应用。

4. **安装 qiankun**：
   在主应用中安装 qiankun：

   ```bash
   npm install qiankun
   ```

5. **配置 qiankun**：

```javascript
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

onMount(() => {
	start();
});
```

6.  **开发微应用**：

```javascript
//vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import qiankun from "vite-plugin-qiankun";
//子应用配置qiankun
export default defineConfig({
    base: "/sub-vue",
    server: {
        port: 5001,
        cors: true,
        origin: "http://localhost:5001",
    },
    plugins: [
        vue(),
        qiankun("sub-vue", {
            useDevMode: true,
        }),
    ],
});
```

```javascript
//main.ts
import { createApp } from 'vue'

import './style.css'
import App from './App.vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

let app:any;
if (!qiankunWindow.**POWERED_BY_QIANKUN**) {
    createApp(App).mount('#app');
} else {
    renderWithQiankun({
        // 子应用挂载
        mount(props) {
            app = createApp(App);
            app.mount(props.container?.querySelector('#app') as Element);
        },
        // 只有子应用第一次加载会触发
        bootstrap() {
            console.log('vue app bootstrap');
        },
        // 更新
        update() {
            console.log('vue app update');
        },
        // 卸载
        unmount() {
            console.log('vue app unmount');
            app && app.unmount();
        }
    });
}

```
vite 构建的react应用配置完会报错,打包后不影响运行
react需要全引入
`import react from react`


7. **构建和部署**：
   使用 Turborepo 构建所有微应用，并将构建产物部署到服务器或静态网站托管服务。

8. **在主应用中注册微应用**：
   根据微应用的部署地址，在主应用中使用 qiankun 的 API 注册微应用。

9. **启动 qiankun**：
   调用 qiankun 的 `start` 方法启动微前端架构。

10. **测试和调优**：
    在集成环境中测试和调优主应用和各个微应用的交互。

使用 Turborepo 和 qiankun 的组合，你可以实现一个高效、可扩展的微前端架构，每个微应用都可以独立开发和部署，同时在主应用中无缝集成。这种模式特别适合大型项目和多团队协作的场景。
