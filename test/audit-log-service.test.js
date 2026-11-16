import test from 'node:test';
import assert from 'node:assert/strict';
import { auditLogs } from '../src/data.js';
import { AuthorizationError, listAuditLogs } from '../src/audit-log-service.js';

test('a member sees logs from their own project', () => {
  const result = listAuditLogs({
    logs: auditLogs,
    viewer: { id: 'user-alice', role: 'member', projectId: 'project-alpha' }
  });

  assert.equal(result.length, 3);
  assert.ok(result.every((entry) => entry.projectId === 'project-alpha'));
});

test('a member cannot request another project', () => {
  assert.throws(
    () => listAuditLogs({
      logs: auditLogs,
      viewer: { id: 'user-alice', role: 'member', projectId: 'project-alpha' },
      projectId: 'project-beta'
    }),
    AuthorizationError
  );
});

test('an admin can request another project', () => {
  const result = listAuditLogs({
    logs: auditLogs,
    viewer: { id: 'admin-1', role: 'admin', projectId: 'project-alpha' },
    projectId: 'project-beta'
  });

  assert.deepEqual(result.map((entry) => entry.id), ['log-1003']);
});

test('results are returned newest first and are safe to mutate', () => {
  const result = listAuditLogs({
    logs: auditLogs,
    viewer: { id: 'user-alice', role: 'member', projectId: 'project-alpha' }
  });

  assert.deepEqual(result.map((entry) => entry.id), ['log-1004', 'log-1002', 'log-1001']);
  result[0].action = 'changed-by-caller';
  assert.equal(auditLogs.find((entry) => entry.id === 'log-1004').action, 'run.approve');
});
