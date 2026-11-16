# 演示需求：审计日志按操作人筛选并导出

为现有审计日志接口增加按操作人筛选和 CSV 导出能力。

## 验收标准

1. `GET /api/audit-logs` 支持可选的 `operatorId` 查询参数；传入后只返回对应操作人的记录。
2. 新增 `GET /api/audit-logs/export`，返回当前查询结果的 CSV 文件，并同样支持 `projectId` 和 `operatorId`。
3. 普通成员只能查询和导出自己所属项目的审计日志。修改 `projectId` 访问其他项目时必须返回 `403`。
4. 管理员可以通过 `projectId` 查询和导出指定项目的数据。
5. CSV 至少包含 `id,projectId,operatorId,action,createdAt` 五列，字段需要正确处理逗号、双引号和换行。
6. 导出响应使用 `text/csv; charset=utf-8`，并设置下载文件名。
7. 为筛选、导出和越权访问补充自动化测试，最终执行 `npm test` 必须全部通过。

## 约束

- 不引入第三方运行时依赖。
- 复用现有权限判断，不能在导出接口中重新实现一套更宽松的权限逻辑。
- 不修改现有接口的默认返回结构。
