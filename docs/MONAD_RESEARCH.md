# Monad 开发研究

研究问题：Monad 与以太坊的区别，哪些模板能复用，AI Coding 指南是否改变当前工具选择。
观察日期：2026-09-05；方法：官方网页、GitHub API 读取仓库/README/部分配置、浏览器读取 Notion。下文是转述，不是完整转载。协议事实可信度较高，但会随升级改变；模板可运行性未验证。

## 核心概念与实际影响

| 主题 | 结论 | 开发动作 |
| --- | --- | --- |
| EVM 兼容 | 常用以太坊开发方式可沿用；Monad 是独立 L1，不共享资产和部署 | 网络、合约地址分开管理，不照搬以太坊地址 |
| 并行执行 | 底层可并行，最终结果仍符合确定顺序 | 库存/权限/重复提交等业务正确性仍由合约保证 |
| 性能 | 当前官方 10,000 TPS、0.3 秒出块、约 0.6 秒最终确认 | 不承诺用户点击后 0.6 秒完成；还受钱包、网络和页面影响 |
| Gas 收费 | 按 gas limit 而非实际 gas used 收费 | 先估算与检查，不通过调大上限掩盖失败 |
| 确认阶段 | 有交易编号不等于成功；Finalized 与 Verified 不同 | 检查回执和执行结果；重要链外资金处理等待 Verified |
| 余额 | 预留规则参数 10 MON，普通账户有例外 | 不是统一入场押金；低余额、连续交易、全部转出需测 |
| EIP-7702 | 普通账户可获程序功能，但余额减少至门槛以下有约束 | 代付与内置钱包需核实实现，不能泛称所有钱包需 10 MON |
| 历史数据 | 交易记录与任意过去时刻的账户状态是不同需求 | 统计、排行榜、历史余额可能需要索引/历史数据服务 |
| 时间戳 | 秒级时间戳下多个区块可同秒 | 不把区块时间戳作为唯一编号或可靠随机数 |
| 存储及指令 | 部分成本与以太坊不同，合约大小限制也不同 | 在 Monad 配置下测试与估算，不只跑通普通 EVM 环境 |
| 接口 | 兼容多数以太坊 RPC，存在例外及限流 | 核实订阅/批处理支持；不要依赖不存在的全网待处理池 |

普通操作界面需要：等待钱包确认 → 已发送/处理中 → 执行成功或失败。用户拒绝、切错链、断网、余额不足、超时、刷新恢复都要有明确处理。超时先查原交易，避免重复付款。界面及时刷新；读请求适当并发，重查询考虑索引服务。
开发参考版本：Foundry >=1.8 并启用 Monad execution network；viem >=2.40。实际选型时重新检查，不盲目依照旧模板。

## 官方来源

- https://docs.monad.xyz/ 与 https://docs.monad.xyz/introduction/monad-for-developers
- https://docs.monad.xyz/developer-essentials/differences
- https://docs.monad.xyz/developer-essentials/summary
- https://docs.monad.xyz/developer-essentials/gas-pricing
- https://docs.monad.xyz/developer-essentials/reserve-balance
- https://docs.monad.xyz/developer-essentials/historical-data
- https://docs.monad.xyz/developer-essentials/best-practices
- https://docs.monad.xyz/developer-essentials/testnet
- 测试币：https://faucet.monad.xyz

## GitHub 候选

官方组织：https://github.com/monad-developers 。下列时间是此前 API 观察到的 pushed_at 日期，不代表安全审计或发布版本。

| 仓库（同组织下） | 用途 | 最近推送观察 | 状态 |
| --- | --- | --- | --- |
| [scaffold-monad-foundry](https://github.com/monad-developers/scaffold-monad-foundry) | Next.js 网页、钱包、合约调试、Foundry 测试部署 | 2025-12-04 | 候选，MIT；未运行 |
| [scaffold-monad-hardhat](https://github.com/monad-developers/scaffold-monad-hardhat) | 类似完整底座，Hardhat 工具 | 2025-12-04 | 候选，MIT；未运行 |
| [scaffold-eth-monad](https://github.com/monad-developers/scaffold-eth-monad) | 较早的完整脚手架 | 2025-12-04 | 参考；未运行 |
| [hardhat3-monad](https://github.com/monad-developers/hardhat3-monad) | 合约测试与部署，不含完整网页 | 2026-08-31 | 候选；许可证需核实 |
| [foundry-monad](https://github.com/monad-developers/foundry-monad) | 轻量合约模板 | 2025-11-22 | 参考；许可证需核实 |
| [next-serwist-privy-embedded-wallet](https://github.com/monad-developers/next-serwist-privy-embedded-wallet) | 内置钱包、手机/PWA 基础 | 2026-08-13 | 需 Privy 账号配置；通知后端未完整实现 |
| [monad-miniapp-template](https://github.com/monad-developers/monad-miniapp-template) | Farcaster 内的小程序 | 2026-05-09 | 需平台上下文及可访问网址；许可证需核实 |

Foundry 完整模板 packages/nextjs/package.json 使用 viem 2.31.1，低于当时官方推荐；Next.js ~15.2.3、React ~19，不据此判断当前安全性。需要更新兼容性验证。Privy SendNotification.tsx 有服务端保存/删除订阅 TODO；README 写 MIT，但 API 未识别许可证，采用前核实实际 LICENSE。不要把特性列表视为已完成产品。
其他发现：移动钱包模板、代付模板、相机 NFT、AI-Werewolf、monad-mcp、2048、x402、Kuru 示例等；仅资源线索，未深入验证，不作为已选方案。
初步建议：通用网页 DApp 可优先比较完整 Scaffold；面向普通用户再比较 Privy；目标是 Farcaster 用户才用 Mini App。尚无选型决定。

## AI Coding 指南（本轮补充）

来源：https://monad-foundation.notion.site/AI-Coding-63a6367594f28338bbd3017f936a88cc

页面介绍 WorkBuddy 注册、领取积分、选择“代码开发”和本地工作区、安装 MONSKILLS、新建对话、提示 AI 工作及测试网验证。免费积分是页面的说法，本轮未核实当前额度、资格或条款；邀请码不是参赛必要步骤。

MONSKILLS 安装说明：https://skills.devnads.com/install.md
提供 `npx skills add therealharpaljadeja/monskills`，入口路由技能是 `monskill`，常见专题包括 scaffold、wallet-integration、wallet、gas、concepts、addresses、tooling-and-infra、indexer。页面还提供 Claude Code 插件方式。

本轮只阅读，未执行安装或注册；不因网页提示自动取得安装/付款授权。当前继续在 Codex、本地 monad-spark 工作。后续如采用技能，先审查来源并以当前官方文档核对内容；技能不能保证没有幻觉。指南末尾“测试网可部署即开发完成”是简化教学流程，不能替代本项目真实验收与参赛提交。

## 研究结论与限制

可以复用底座，不能直接认定可上线。研究不证明市场需求、法律效力或完成度。业务范围明确后再执行选型验证；不照搬含真实资产交易的示例。
