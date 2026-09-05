# 活动规则与 MOJO 提交操作

观察日期：2026-09-05；来源为活动页、Notion 正文及 Agent 接口。对外状态易变化，提交前重新查询。此文档不包含密钥、认领令牌或个人账户资料。

## 活动事实

- Monad Blitz@惠州，2026-09-05，eventId=16，一天线下黑客马拉松；最多 3 人，也可单人。
- 09:00–09:30 签到早餐；09:30–11:00 Workshop；11:00–12:00 午餐组队；12:00–18:30 开发。
- 18:30 提交截止；18:30–19:00 晚餐；19:00–20:00 演示；20:00–20:20 投票；随后颁奖交流，约 21:00 结束。
- 每队演示 5 分钟，核心为测试网实际运行、创新和简短技术说明；PPT 可选，建议备份录像和截图。
- 第一至第三名分别 600 / 500 / 400 USD，前三名各有 Monad 定制键盘；奖金分配由团队自行商定。
- 活动可能摄影、录像；媒体条款见活动页，不在本项目中伪造用户已另行接受的记录。

## 必须遵守

新项目；可以提前调研规划；实际编码与资源开发在正式时间内开始，GitHub 代码提交也应在比赛期间。允许标准库和样板，禁止已有产品直接参赛或没有重大创新的复制。
提交材料公开、GitHub 公开、前端公网可访问、项目在 Monad 网络实际运行并持续有效。演示指南明确测试网。提交前确认 MOJO 登录、组队；提交阶段后无法再加入队伍，只有队长可提交。
说明应简洁、真实；不用冗长 AI 文案，不包含攻击性或与项目无关内容。现场获奖还会赛后审核，违规可取消资格。

## 评审口径

活动页说观众投票；Notion 提交流程进一步说明与评委投票共同计算，比例未公开。评审标准看：核心要求是否满足、完成度、未来商业模型是否合理。不得把后者当作已经验证商业需求的证据。

## 材料清单与当前状态

| 材料 | 状态 |
| --- | --- |
| 名称 MonadSpark | 用户已确认；不是最终业务品牌承诺 |
| 简介 | 草案：探索基于 Monad 的标书编制与文档签约平台，目前处于方案规划阶段 |
| Logo / 预览图 | 尚未制作 |
| 演示网址 | 无 |
| GitHub | https://github.com/Allenth/monad-spark ，仍私有 |
| 至少一张实际截图 | 无，禁止伪造或盗用 |
| 测试网合约及演示 | 未开发、未部署 |
| 项目编号及审核状态 | 无；此前查询 project=null |

## 2026-09-05 截止前提交尝试

- 重新查询活动为 `ongoing`，当前仍允许提交；项目仍为 `null`。
- Sites 演示站已切换为公开访问，GitHub 仓库已切换为公开。
- 使用 Sites 生成的实际首页截图上传并确认成功，没有伪造截图或链上回执。
- 创建项目请求被 MOJO 以 400 拒绝：当前活动启用团队功能，仅队长可提交。
- 浏览器核实当前队伍为“标新链异”，孟庆辉为成员，庄康发为队长，队伍 3/3。
- 项目名称、简介、网址、GitHub 和截图材料已经准备好；需由队长账号或其已绑定 Agent 发起最终创建。当前没有项目 ID，不能写成已提交。

用户请求占位已授权，但尚未执行。说明页不能自动满足“实际运行的 DApp”要求；不使用私人仓库地址冒充演示网址，不伪造截图 uuid。创建接口文档未单列 Logo 字段，与人工提交指南区别保留，实际表单/接口校验优先。

## 凭证管理

- 本地文件：`/Users/waykingah/.codex/credentials/mojo-monad-spark-event-16.json`。
- 权限 600，只允许当前操作系统用户读写；是本机文件，非加密保险库。
- 不复制进仓库，不打印内容，不上传 GitHub，不放入网页或截图；不把认领链接写入持久项目文档。
- 助手名称 MonadSpark Assistant；认领已确认成功。后续复用，不重复注册。
- 仅向 `https://mojo.devnads.com` 发送 Bearer 密钥；S3 图片上传绝不带该头。

## Agent 操作顺序

接口来源：https://mojo.devnads.com/api/agent/instructions/16/skill.md

1. 已完成 POST `/api/agent/register`，用户亲自打开认领链接绑定。
2. 带 Authorization 查询 GET `/api/agent/me`，要求 status=claimed 且 claimedUser 存在。
3. GET `/api/agent/projects?eventId=16`；已有项目就更新，不重复创建。
4. 真实 PNG/JPEG/GIF/WebP 图片，每张不超过 10MB。POST `/api/agent/uploads`，传 filename/contentType/size，获取 uuid/uploadUrl/path。
5. 将图片二进制 PUT 到返回的 uploadUrl，Content-Type 保持一致，不带 Mojo Authorization。
6. POST `/api/agent/uploads/confirm`，传 uuid；只有确认后的 uuid/path 可用。
7. POST `/api/agent/projects`，传 name/description/url/eventId=16/meta.github/meta.screenshots（uuid/path 数组）。
8. 已有项目则 PATCH `/api/agent/projects/<projectId>`；不必传 id/eventId。
9. 创建 201 或更新成功后进入 pending，代表等待人工审核，不等于入选、获奖或最终资格通过。
10. 保存无敏感信息的回执、项目 ID、时间及审核状态；再 GET 查询确认。

403：认领或资格问题；团队仅队长可操作。400：依据 fieldErrors 修正。409：使用 existingProjectId 更新。404：核对项目归属。每次服务端都会核验阶段、报名、签到、队长、网址与截图归属。
不要把旧的 ongoing 查询当作永远可提交；截止后停止并报告实际状态，不回写时间。

## 来源

- [活动页](https://mojo.devnads.com/events/16)
- [资料包](https://monad-foundation.notion.site/Monad-Blitz-e906367594f28338955f0140f791eb4a)
- [参赛规则](https://monad-foundation.notion.site/7546367594f2835ba564814eae664af9)
- [提交](https://monad-foundation.notion.site/e6b6367594f28317b5fd0100fb466b12)
- [评审](https://monad-foundation.notion.site/5d46367594f283769ed581e2837b39c7)
- [演示](https://monad-foundation.notion.site/b816367594f283ddae4b81b6ebc0baf7)
