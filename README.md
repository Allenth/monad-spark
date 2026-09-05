# MonadSpark

面向 Monad Blitz@惠州的项目工作区。面向投标企业，衔接已有 AI 编标成果，规划标书/合同关联、双方确认及文件核验。

## 当前状态

当前已安装 Sites/React 工程，完成着陆页与六页产品演示；工作台已扩展为虚构数据点击 Demo，包含发起、签署、撤销和核验。真实链上签署、域名绑定、MOJO 提交尚未完成。详见 [本轮交付](docs/LANDING_AND_DEMO.md)。

- GitHub：https://github.com/Allenth/monad-spark （私有）
- 本地目录：`/Users/waykingah/Pictures/macOSwinOSCoding/AutoWebFactory(Skills)/projects/monad-spark`
- 活动：https://mojo.devnads.com/events/16
- 沟通方式：使用直白中文，解释必要术语，先说结果。

## 新建会话继续工作

在 Codex 中选择本项目文件夹，再创建会话。可直接说：“读取 AGENTS.md 和 docs/SESSION_HANDOFF.md，基于现有进度继续本次任务。”
新会话靠项目文件接续，不依赖旧聊天自动传入。[会话交接](docs/SESSION_HANDOFF.md)保存当前执行位置。

## 阅读顺序

1. [项目记忆](PROJECT_MEMORY.md)：当前事实、决定和下一步。
2. [完整沟通决策记录](docs/DECISIONS_AND_CONVERSATION.md)：各轮沟通及纠正。
3. [活动与提交操作](docs/EVENT_AND_SUBMISSION.md)：比赛规则及 MOJO 操作。
4. [Monad 技术研究](docs/MONAD_RESEARCH.md)：链的差异、脚手架、AI 工具。
5. [产品范围草案](docs/PRODUCT_SCOPE.md)：用户方向和未决问题。
6. [开发计划 v0.5 与待编码状态](docs/projects/monad-spark/PROJECT_PLAN.md)：门禁、责任、里程碑。
7. [执行记录](docs/DEVELOPMENT_LOG.md)及[文档标准与审计](docs/DOCUMENT_REGISTER.md)。

## 环境与命令

已安装 npm 依赖。`npm run dev` 启动本地预览，`npm run build` 已通过。

## 架构与部署

Sites/React 前端，计划结合 Monad 测试网。当前只完成产品介绍与交互演示，没有已部署的签署合约。目标域名 captionrewrite.com 尚未绑定。

## 故障排查

MOJO 身份、截图上传和错误码见提交指南。密钥在仓库之外，仅记录路径，禁止复制到文档、截图或 Git。项目说明不能宣称已具备法律签约效力。

流程审查与修订图见 [FLOW_REVIEW.md](docs/FLOW_REVIEW.md)。当前部署地址为 https://monad-spark-sign.qinghui-meng.chatgpt.site ，仅所有者访问。

点击演示入口 `/workspace`，在线使用说明 `/guide`；详细页面规格见 [DEMO_SPEC.md](docs/DEMO_SPEC.md)。Demo 不接真实钱包或链上数据。
