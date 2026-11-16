# LoopForge Tutorial Demo

这是一个用于 LoopForge 0—1 实战教程的最小 Node.js 项目。它提供了一个带项目权限边界的审计日志查询接口，后续由 SOP 完成“按操作人筛选并导出 CSV”的需求。

项目不依赖第三方 npm 包，Node.js 18 及以上版本即可运行。

## 本地验证

```bash
npm test
npm start
```

服务默认监听 `http://localhost:3000`。

健康检查：

```bash
curl http://localhost:3000/health
```

以普通成员身份查看自己项目的日志：

```bash
curl \
  -H 'x-user-id: user-alice' \
  -H 'x-role: member' \
  -H 'x-project-id: project-alpha' \
  'http://localhost:3000/api/audit-logs'
```

尝试访问其他项目会返回 `403`：

```bash
curl \
  -H 'x-user-id: user-alice' \
  -H 'x-role: member' \
  -H 'x-project-id: project-alpha' \
  'http://localhost:3000/api/audit-logs?projectId=project-beta'
```

## 用于 LoopForge 的任务

把本项目推送到 GitHub 后，在 LoopForge 中创建需求。需求正文可以直接复制 [docs/demo-requirement.md](docs/demo-requirement.md)。

项目当前只实现了基础查询，尚未实现：

- 按 `operatorId` 筛选；
- CSV 导出接口；
- 筛选与导出的自动化测试。

这些内容将由 LoopForge 中的需求分析、开发、评审、测试和人工验收流程完成。

## 项目结构

```text
.
├── docs/
│   └── demo-requirement.md
├── src/
│   ├── audit-log-service.js
│   ├── data.js
│   └── server.js
├── test/
│   └── audit-log-service.test.js
└── package.json
```

## License

MIT
