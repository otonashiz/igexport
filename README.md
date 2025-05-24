# 🚀 IGExportGuru

> 轻松导出Instagram关注者和关注列表的现代化工具

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)

## ✨ 功能特性

- 🎯 **简单易用** - 输入用户名即可导出数据
- 📊 **Excel导出** - 生成标准Excel文件(.xlsx)
- 🌍 **多语言支持** - 支持中英文等5种语言
- 📱 **响应式设计** - 完美适配所有设备
- 🔒 **数据安全** - 只导出公开信息，无需登录
- ⚡ **快速高效** - 最多支持200个用户数据导出

## 🛠️ 技术栈

### 前端
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** - 现代化UI设计
- **Zustand** - 轻量级状态管理
- **react-i18next** - 国际化支持

### 后端
- **Node.js** + **Express** + **TypeScript**
- **Puppeteer** - 数据获取
- **xlsx** - Excel文件生成
- **多重安全中间件**

## 📦 项目结构

```
igexport/
├── igexportguru-frontend/     # React前端应用
│   ├── src/
│   │   ├── components/        # UI组件
│   │   ├── stores/           # 状态管理
│   │   ├── types/            # TypeScript类型
│   │   ├── utils/            # 工具函数
│   │   └── i18n/             # 国际化配置
│   └── ...
├── igexportguru-backend/      # Node.js后端API
│   ├── src/
│   │   ├── routes/           # API路由
│   │   ├── middlewares/      # 中间件
│   │   ├── config/           # 配置文件
│   │   └── types/            # 类型定义
│   └── ...
└── devlog.md                 # 开发日志
```

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn

### 前端开发
```bash
cd igexportguru-frontend
npm install
npm run dev
```

### 后端开发
```bash
cd igexportguru-backend
npm install
npm run dev
```

## 🌐 多语言支持

- 🇺🇸 English (默认)
- 🇨🇳 简体中文
- 🇭🇰 繁体中文
- 🇮🇹 Italiano
- 🇪🇸 Español

## 📝 使用说明

1. 访问应用首页
2. 输入Instagram用户名或链接
3. 选择导出类型（关注者/关注中）
4. 点击导出按钮
5. 查看数据预览
6. 下载生成的Excel文件

## 🔧 开发阶段

- [x] **Phase 1** - 项目初始化与基础架构
- [ ] **Phase 2** - 前端核心功能开发
- [ ] **Phase 3** - 后端API开发
- [ ] **Phase 4** - 集成与优化
- [ ] **Phase 5** - 测试与部署

## 📋 TODO

- [ ] 完成UI组件库
- [ ] 实现数据获取逻辑
- [ ] 添加错误处理机制
- [ ] 性能优化
- [ ] 单元测试
- [ ] 部署配置

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

- 项目链接: [https://github.com/otonashiz/igexport](https://github.com/otonashiz/igexport)
- 问题反馈: [Issues](https://github.com/otonashiz/igexport/issues)

---

⭐ 如果这个项目对你有帮助，请给我们一个星星！ 