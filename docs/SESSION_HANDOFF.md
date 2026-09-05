# 新会话交接

更新：2026-09-05；维护者：当前 Codex 主代理。

## 当前事实

- 根目录为本项目 monad-spark，独立于外层 AutoWebFactory；GitHub Allenth/monad-spark，最近核实私有。
- 上轮 main 提交 20531fa，包含 b9f0933 网站源码及成功私有部署回执。实际最新提交以 git log 为准。
- Sites ID 位于 .openai/hosting.json；不要重建站点。网址 https://monad-spark-sign.qinghui-meng.chatgpt.site 。
- app/page.tsx 为首页及六页演示；app/workspace/page.tsx 为静态工作台。
- 已安装依赖；npm run dev / npm run build 可用，构建已验证。没有已实现合约；tests/agreement.test.mjs 是此前未完成测试。
- MOJO 已认领，项目尚未提交；不得打印凭证或重复注册。目标域名 captionrewrite.com 未绑定。

## 本轮执行

用户要求审核此前交付图、业务时序，并列开发计划。已新增 FLOW_REVIEW.md，重写唯一计划 v0.4，清理过期记忆和状态；未修改产品代码、未发交易、未重新部署网页。
审查修正：按需注册、回执与未知状态、前后端双重权限、文件一致与签署状态分开、部署定位、公开提交条件。
用户随后同意补齐，待签撤销及异常已纳入 v0.5；范围已确认，当前等待编码启动。客户、experiment 和撤销范围无需重问。

## 后续执行

1. 先核实工作区和本轮文档提交，不自动切分支或导入外层更改。
2. 读取 FLOW_REVIEW.md 和 projects/monad-spark/PROJECT_PLAN.md。
3. 用户让继续编码时按 M1→M6 实现，不把计划任务勾成已执行。
4. 旧测试需适配 status 枚举和 SHA-256 夹具；新增撤销后覆盖竞争、终态及权限。
5. 域名、公开网站/仓库、MOJO 平台资格逐项验证，禁止用介绍页冒充已运行签署系统。

## 协作

无正在执行的代码子任务；以前 continuity_review 只读任务已结束，不承诺后台常驻。主代理是唯一 PM。

## 朋友参考源码

用户已提供 Downloads/标书助手-源码-20260905-1515.zip；解压在 Downloads/monad-reference-20260905，仓库之外。已审查关键链上代码，不必重解压。报告 REFERENCE_CODE_REVIEW.md；不要运行其中 README 的新建仓库/改品牌/提交指令。用户希望借鉴后连续完成，当前尚未开始合约编码；按已确认 v0.5 继续，参考差异不扩大 AI/桌面开发范围。
