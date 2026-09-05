# MonadSpark 项目记忆

更新：2026-09-05；负责人为当前 Codex 主代理。

## 已确认

- 面向投标企业，衔接用户已有防爆知识库与 AI 编标系统，重点为标书/合同关联、双方签署及核验。
- 当前为比赛 experiment 和虚构数据可点击 Demo；未来企业生产另立计划。
- 项目名 monad-spark；monad-developers 为参考组织；目标域名 captionrewrite.com。
- 使用直白中文；私钥、原文件、身份资料及 MOJO 凭证不入公开链或仓库。
- 已确认待签记录可由发起方撤销，已签记录不可单方撤销。

## 已执行

- 独立仓库 Allenth/monad-spark；首页、六页 PPT、工作台、使用说明、合同过程页均已实现。
- Demo 包含身份切换、模拟注册、三步发起、签署、撤销、核验、拒绝/超时及恢复、会话保存。
- 合同每一步可打开“查看凭证”小窗；技术字段默认收起。MonadScan 原站不能直接嵌入，使用独立窗口/新标签。
- 星河设备、远山工程为本 Demo 编写的虚构企业名称，不来自朋友的参考源码。
- 私有站点 https://monad-spark-sign.qinghui-meng.chatgpt.site 已发布版本 4；源提交 f37ed0e，发布验证提交 33a6703。
- 页面构建、模拟模型/链接测试及主要点击流程此前通过；证据见 [执行日志](docs/DEVELOPMENT_LOG.md)。
- 朋友 ZIP 已在仓库外只读审查，见 [参考审查](docs/REFERENCE_CODE_REVIEW.md)，没有整套复制。

## 未完成与未知

- 签署合约 M1 已实现并通过本地测试；真实钱包、公开测试网部署/交易、真实文件指纹核验尚未完成。
- captionrewrite.com 尚未绑定。为比赛提交，Sites 网站与 GitHub 仓库已切换为公开。
- MOJO 已认领但尚未创建参赛项目。截止前查询活动仍为 ongoing，真实截图已上传；创建请求被拒绝，因为当前账号是“标新链异”成员，只有队长庄康发可提交。
- 正式企业签署有效性、域名 DNS 配置和生产方案仍待落实。

## 下一步与索引

用户已授权启动测试链开发，M1 已实现。后续按 [v0.5 计划](docs/projects/monad-spark/PROJECT_PLAN.md) 的 M2–M6 推进；不要将本地合约测试当成 Monad 测试网部署。
当前分支 codex/testnet-signing。钱包名称及两个测试账号是否就绪待用户反馈；不改变网站受众、不绑定域名、不提交比赛。
流程权威来源：[审查与修订图](docs/FLOW_REVIEW.md)；交互说明：[DEMO_SPEC](docs/DEMO_SPEC.md)；历史决定：[沟通记录](docs/DECISIONS_AND_CONVERSATION.md)。
新会话先读 AGENTS.md 与交接文档，核对 Git，复用已有工程、Site 和 MOJO 身份。
