# 📝 Web/App 术语闪卡 - 后续开发计划 (To-Do List)

本文档记录了项目未来需要实现的迭代任务和功能规划。

## Phase 1: 核心学习体验增强 (Core Learning Experience)
- [ ] **记忆反馈机制 (Self-Assessment)**
  - 卡片翻转到背面后，底部出现「记住了 (Correct)」和「没记住 (Incorrect)」两个操作按钮。
  - 记录用户的点击结果，用于后续的记忆曲线计算或数据统计。
- [ ] **卡片收藏功能 (Favorites)**
  - 在卡片正面/背面添加“收藏（⭐️/❤️）”按钮。
  - 允许用户将难以记忆或高频使用的术语加入个人收藏夹。

## Phase 2: 用户系统与个人中心 (User System & Profile)
- [ ] **用户登录与注册 (Authentication)**
  - 接入 **Supabase Auth** 实现基础的用户账户系统，支持用户登录与注册。
- [ ] **个人学习看板 (User Dashboard)**
  - 用户登录后可进入“我的”页面，查看个人学习数据（数据存储于 Supabase 数据库）。
  - **数据统计维度**：
    - 已学习的卡片总数。
    - 单张卡片的复习次数。
    - 记忆准确率（正确 vs 错误 的比例）。
- [ ] **我的收藏夹页面 (My Favorites Collection)**
  - 在个人中心提供专属列表，集中展示用户收藏的所有卡片，并支持针对收藏卡片进行专项复习。

## Phase 3: 后台内容管理系统 (Admin CMS)
- [ ] **隐藏的 Admin 入口与鉴权**
  - 设置一个隐藏的路由/入口（如 `/admin`），结合 Supabase 的权限管理 (RLS) 或用户角色，仅限具有 Admin 权限的账号登录访问。
- [ ] **术语库管理 (Card Management)**
  - 将卡片数据迁移至 **Supabase PostgreSQL 数据库**。
  - 提供可视化的表格或列表，展示所有现存卡片。
  - 支持对卡片进行 **添加 (Create)**、**编辑 (Update)**、**删除 (Delete)** 操作（包括术语、中文名、解释和例子）。
- [ ] **分类管理 (Category Management)**
  - 支持管理员动态新增、修改或删除术语分类（如新增“AI 术语”分类）。
