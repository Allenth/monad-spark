# 新会话交接

更新：2026-09-05。维护者：当前 Codex 主代理。用途：给新会话恢复执行位置；长期方向见 PROJECT_MEMORY，完整历史见沟通记录。后续每次实质工作后更新本文件。

## 当前工作区

- 项目：MonadSpark / monad-spark。
- 根目录：`/Users/waykingah/Pictures/macOSwinOSCoding/AutoWebFactory(Skills)/projects/monad-spark`。
- 远程：https://github.com/Allenth/monad-spark ，最近验证为私有。
- 当前分支：main。接续规则变更前的已同步文档基线：cc9b39d。
- 新会话以实际 `git status` 和 `git log` 为准；其他工作树可能不在 main，不能擅自切换。

## 已完成

- 创建独立仓库、初始化、整理并同步活动/研究/产品范围/计划/沟通文档。
- 注册 Mojo 助手，用户已亲自认领。最后一次查询 claimed；活动 ongoing、project=null（2026-09-05 的观察，后续必须重新查询）。
- 本轮建立新会话接续协议；continuity_review 子 Agent 做只读检查。它不承担后台持续运行，不是第二个项目经理。

## 尚未完成

没有应用代码、脚手架、依赖安装、UI、合约、测试、网站部署或 MOJO 项目提交。没有实际启动/构建命令。
用户要求占位提交，意图已保留；仍缺真实截图和可访问网址，不得伪造或用介绍页冒充完成的 DApp。

## 已有方向及关键未决

用户已确认服务投标企业，正在梳理首要痛点。方向为基于 Monad 的标书编制及签约 SaaS；用户已说明甲方注册 ID/密钥并签电子合同，标书与合同关联留证。已有 AI 编标能力不重建；指纹存证和钱包管理具体设计仍待确认。
计划状态 Draft；experiment 分类已由用户明确确认；M0 完成，M1 细化设计与计划仍待完成。
“绘画”在近期语境暂按“会话”理解，未据此把产品改为绘画应用。

## 下一步可执行动作

1. 先读根 AGENTS.md 和所列入口，检查 Git 实况。
2. 用户若要求继续原产品，先明确文件包、密钥管理、存储及现有 AI 的参赛使用边界；不再询问比赛还是正式企业签约。随后完成范围和计划，再进入设计开发。
3. 用户若提出其他开发，判断是现有项目增量还是明确改方向，保留旧记录并调整计划；不自行新建仓库。
4. 用户若要求提交，读 EVENT_AND_SUBMISSION 并查询最新平台阶段/项目；复用已有身份，材料齐全后按已有授权办理。

## 文件与验证入口

- docs/DECISIONS_AND_CONVERSATION.md：用户决定、建议、纠正。
- docs/PRODUCT_SCOPE.md：未批准产品范围。
- docs/projects/monad-spark/PROJECT_PLAN.md：唯一计划。
- docs/MONAD_RESEARCH.md：官方资料、模板、AI 工具。
- docs/EVENT_AND_SUBMISSION.md：提交接口及凭证位置；不能输出凭证内容。
- docs/DEVELOPMENT_LOG.md：验证和执行证据。

## 当前并行与恢复规则

本轮子 Agent 已完成只读审查，发现的旧进度记录已修正；没有并行写代码任务；后续不假定它仍存在。接续协议提交后以日志中的提交和实际工作区为准。
不清理别人的未提交改动，不自动覆写文件。需要代码隔离时使用明确分工的分支/工作树，并把位置写回这里。
