# 后台管理系统接入说明

本项目已经接入 Sanity CMS。前台首页会优先读取 Sanity 里的内容；如果没有配置 Sanity 环境变量，则继续使用 `data/site.ts` 里的本地默认内容。

## 当前后台入口

本地开发：

```text
http://localhost:3000/studio/
```

部署到 GitHub Pages 后：

```text
https://账号名.github.io/仓库名/studio/
```

如果仓库名是 `账号名.github.io`，后台入口就是：

```text
https://账号名.github.io/studio/
```

当前两个前台页面：

```text
网站一：https://wadepan1017.github.io/aflat-concerto-site-preview/
网站二：https://wadepan1017.github.io/aflat-concerto-site-preview/second/
```

## 需要配置的环境变量

参考 `.env.example`：

```text
NEXT_PUBLIC_SITE_KEY=main
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-06-03
```

本地开发时复制一份 `.env.local` 并填入真实值。GitHub Pages 部署时，在 GitHub 仓库的 `Settings -> Secrets and variables -> Actions -> Variables` 里添加同名变量。

## Sanity 后台内容结构

Studio 打开后先选择要管理的网站：

- `网站一：AFlatConcerto`
- `网站二：新网站`

进入某个网站后有两个入口：

- `首页内容`：编辑个人主页的名称、副标题、简介、头像、首页海报、关于我信息块和社交链接。
- `作品管理`：新增、排序和编辑作品。`排序数字` 越小越靠前；开启 `设为精选作品` 后会优先出现在作品区顶部。

客户不需要填写 `main` 或 `second` 这类网站标识。后台会根据左侧选择的网站自动归类内容。

## 手机端使用方式

手机上建议这样操作：

1. 打开 `/studio/` 后，先点要管理的网站。
2. 如果要改首页文字、头像、账号链接，点 `首页内容`。
3. 如果要新增或修改作品，点 `作品管理`。
4. 进入编辑页后，按顶部字段分组切换：
   - `基础文字` / `基础信息`
   - `图片`
   - `关于我`
   - `账号链接`
   - `详情`
5. 修改完成后点 `发布`。

后台已经隐藏了网站标识等系统字段，客户只需要按分组填写内容。

## 静态部署的刷新规则

当前部署目标是 GitHub Pages，所以页面内容是在构建时从 Sanity 读取的。后台改完内容后，需要重新部署一次网站，前台才会显示最新内容。

可用刷新方式：

- 在 GitHub Actions 页面手动运行 `Deploy Next.js to GitHub Pages`。
- 代码推送到 `main` 后自动部署。
- 可选：在 Sanity webhook 中触发 GitHub `repository_dispatch`，事件类型填写 `sanity-content-update`。

## Sanity 必做设置

在 Sanity 项目设置里添加 CORS Origins：

```text
http://localhost:3000
https://账号名.github.io
```

如果使用项目页部署，还需要确认后台地址带有仓库路径，例如 `/仓库名/studio/`。

## 本地检查命令

```powershell
npm run lint
npm run build
npm run dev
```
