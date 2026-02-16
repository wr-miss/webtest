# RuigeTest - 网页制作与部署示例项目

这是一个完整的网页制作与部署示例项目，展示了如何从零开始创建、测试和部署一个现代网页。

## 🎯 项目目标

- 学习网页制作的基础知识（HTML、CSS、JavaScript）
- 掌握现代网页开发的最佳实践
- 了解如何将网页部署到互联网上
- 提供一个可以直接使用的示例项目

## 📁 项目结构

```
ruigetest/
├── index.html              # 主页面文件
├── style.css              # 样式文件
├── script.js              # JavaScript交互文件
├── 如何制作自己的网页并部署.md  # 详细指南文档
└── README.md              # 本文件
```

## 🚀 快速开始

### 1. 本地运行

```bash
# 使用Python简单服务器
python3 -m http.server 8000

# 或使用Node.js的http-server
npx http-server -p 8080
```

然后在浏览器中访问：
- http://localhost:8000
- 或 http://localhost:8080

### 2. 直接打开

直接在浏览器中打开 `index.html` 文件即可查看效果。

## ✨ 功能特性

### 🎨 界面设计
- 响应式布局，适配各种设备
- 现代化的UI设计
- 平滑的动画效果
- 深色/浅色主题切换

### ⚡ 交互功能
- 实时时间显示
- 动态内容管理（添加/删除项目）
- 表单验证系统
- 键盘快捷键支持
- 本地存储（记住主题偏好）

### 🛠️ 开发工具
- 完整的HTML5结构
- 模块化的CSS设计
- 面向对象的JavaScript代码
- 详细的代码注释

## 📚 学习指南

### 适合人群
- 网页开发初学者
- 想要学习前端开发的人
- 需要制作个人网站的人
- 对网页部署感兴趣的人

### 学习路径
1. **基础学习**：阅读 `如何制作自己的网页并部署.md`
2. **代码分析**：查看HTML、CSS、JS文件的结构
3. **实践修改**：尝试修改代码并观察效果
4. **部署实践**：按照指南将网站部署到互联网

## 🌐 部署指南

### 免费部署平台推荐

#### 1. GitHub Pages（最简单）
```bash
# 创建GitHub仓库
# 将代码推送到仓库
# 在仓库设置中启用GitHub Pages
```

访问地址：`https://你的用户名.github.io/ruigetest`

#### 2. Vercel（最快速）
1. 访问 [vercel.com](https://vercel.com)
2. 导入GitHub仓库
3. 一键部署

访问地址：`https://ruigetest.vercel.app`

#### 3. Netlify（功能最全）
1. 访问 [netlify.com](https://netlify.com)
2. 拖拽上传或连接Git仓库
3. 自动部署

访问地址：`https://ruigetest.netlify.app`

### 部署步骤（以Vercel为例）

1. **准备代码**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   ```

2. **推送到GitHub**
   ```bash
   git remote add origin https://github.com/你的用户名/ruigetest.git
   git push -u origin main
   ```

3. **在Vercel部署**
   - 登录Vercel
   - 点击"New Project"
   - 选择你的GitHub仓库
   - 点击"Deploy"

4. **访问网站**
   - 部署完成后会获得一个 `*.vercel.app` 的链接
   - 可以绑定自定义域名

## 🔧 自定义修改

### 修改网站内容
1. 编辑 `index.html` 修改页面结构
2. 编辑 `style.css` 修改样式
3. 编辑 `script.js` 修改交互功能

### 添加新功能
1. 在HTML中添加新的元素
2. 在CSS中为新元素添加样式
3. 在JavaScript中添加交互逻辑

### 更换主题颜色
在 `style.css` 中修改以下颜色变量：
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --background-color: #f8f9fa;
    --text-color: #333;
}
```

## 📖 详细文档

完整的网页制作与部署指南请查看：
[如何制作自己的网页并部署.md](./如何制作自己的网页并部署.md)

该文档包含了：
- 从零开始的网页制作教程
- 详细的代码示例
- 部署到各种平台的步骤
- 优化和维护建议
- 常见问题解答

## 🎮 交互演示

### 可用功能
1. **主题切换**：点击"切换主题颜色"按钮
2. **动态列表**：点击"添加示例项目"按钮
3. **表单验证**：在表单中测试输入验证
4. **键盘快捷键**：
   - `Ctrl + M`：显示欢迎消息
   - `Ctrl + A`：添加新项目
   - `Ctrl + D`：切换主题
   - `Ctrl + ?`：显示帮助

### 控制台调试
在浏览器控制台中可以访问：
```javascript
// 查看存储信息
RuigeTest.getStorageInfo()

// 显示欢迎消息
RuigeTest.showWelcomeMessage()

// 显示键盘帮助
RuigeTest.showKeyboardHelp()
```

## 🤝 贡献与反馈

### 报告问题
如果你发现任何问题或有改进建议：
1. 在GitHub仓库中创建Issue
2. 描述具体问题和重现步骤
3. 提供相关截图或代码示例

### 贡献代码
1. Fork本仓库
2. 创建功能分支
3. 提交更改
4. 创建Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢所有为网页开发社区做出贡献的开发者们！

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 在GitHub仓库中创建Issue
- 查看详细文档获取更多帮助

---

**开始你的网页制作之旅吧！** 🚀

记住：每个伟大的网站都从一个简单的页面开始。从这里出发，创造属于你自己的精彩！