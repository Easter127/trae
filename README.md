# 苔藓3D交互场景 🎮🌿

一个用 Three.js 和 React 构建的炫酷苔藓3D场景，支持鼠标交互控制！

## ✨ 特性

- **苔藓3D场景**：使用 InstancedMesh 高效渲染 15000+ 个苔藓实例
- **鼠标交互**：检测鼠标距离，动态控制苔藓生长高度和颜色变化
- **光影效果**：环境光 + 方向光（带阴影）+ 点光源 + SoftShadows
- **高性能**：使用 React Three Fiber + drei，极致优化
- **响应式设计**：适配各种屏幕尺寸
- **Trae Solo 支持**：完美集成 Trae Solo，支持一键修改和部署

## 🚀 Trae Solo 使用指南

### 1. 开发模式
```bash
npm run dev
```
在浏览器打开 http://localhost:16000

### 2. 生产构建
```bash
npm run build
```

### 3. 一键修改和部署
1. 用 Trae Solo 修改项目内容
2. 提交代码到 GitHub
3. 自动触发 GitHub Pages 部署！

## 📁 项目结构

```
/workspace
├── src/
│   ├── components/
│   │   └── MossScene.tsx      # 苔藓3D场景组件
│   ├── pages/
│   │   ├── Home.tsx           # 首页
│   │   └── About.tsx          # 关于页面
│   ├── App.tsx                # 应用入口
│   └── main.tsx               # React 入口
├── .github/workflows/
│   └── deploy.yml             # GitHub Pages 自动部署
└── vite.config.ts             # Vite 配置
```

## 🔧 技术栈

- **前端**：React 18 + TypeScript
- **3D**：Three.js + React Three Fiber + drei
- **样式**：Tailwind CSS
- **构建**：Vite
- **部署**：GitHub Pages / Vercel

## 🎯 快速修改

### 修改苔藓颜色
编辑 `src/components/MossScene.tsx` 中的颜色数组

### 修改苔藓数量
编辑 `src/components/MossScene.tsx` 中的 `INSTANCE_COUNT` 常量

### 修改页面内容
编辑 `src/pages/Home.tsx` 和 `src/pages/About.tsx`

## 📝 License

MIT License © 2024
