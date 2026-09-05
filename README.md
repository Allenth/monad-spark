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

需要 Node.js >=22.13.0。首次检出运行 `npm ci` 安装锁定依赖，再运行 `npm run dev` 启动本地预览（默认 http://localhost:3000）。

- `npm run build`：构建，最近一次页面更新已通过。
- `node --test tests/demo.test.mjs tests/explorer.test.mjs`：模拟状态及浏览器链接测试，此前已通过。
- `tests/agreement.test.mjs` 属于待实现合约计划，不代表真实签署测试已经通过。

## 架构与部署

Sites/React 前端，计划结合 Monad 测试网。当前只完成产品介绍与交互演示，没有已部署的签署合约。目标域名 captionrewrite.com 尚未绑定。

## 故障排查

MOJO 身份、截图上传和错误码见提交指南。密钥在仓库之外，仅记录路径，禁止复制到文档、截图或 Git。项目说明不能宣称已具备法律签约效力。

流程审查与修订图见 [FLOW_REVIEW.md](docs/FLOW_REVIEW.md)。当前部署地址为 https://monad-spark-sign.qinghui-meng.chatgpt.site ，仅所有者访问。

点击演示入口 `/workspace`，在线使用说明 `/guide`；详细页面规格见 [DEMO_SPEC.md](docs/DEMO_SPEC.md)。Demo 不接真实钱包或链上数据。

## 演示入口与数据说明

| 页面 | 路径 | 内容 |
| --- | --- | --- |
| 首页与产品演示 | `/` | 着陆页、六页 PPT 式介绍 |
| 工作台 | `/workspace` | 模拟注册、发起、签署、撤销、文件核验 |
| 使用说明 | `/guide` | 点击步骤及演示边界 |
| 合同记录 | `/chain?record=DEMO-1002` | 按合同查看模拟过程，点击“查看凭证”打开简明小窗 |

“星河设备（乙方）”和“远山工程（指定甲方）”均为本 Demo 编写的虚构名称，不是从用户提供的参考源码中提取的企业资料。记录保存在当前标签页的会话存储中，不是链上数据。

凭证小窗是本站界面；MonadScan 禁止直接嵌入其他网站，原站通过独立窗口或新标签打开。模拟记录不提供虚假的交易链接。

当前在线版本为私有 Demo v4，源码提交 `f37ed0e`，发布证据见执行日志。**captionrewrite.com 尚未绑定；真实钱包、合约部署和比赛提交尚未完成。**
