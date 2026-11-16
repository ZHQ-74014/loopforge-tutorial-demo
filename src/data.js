export const auditLogs = Object.freeze([
  {
    id: 'log-1001',
    projectId: 'project-alpha',
    operatorId: 'user-alice',
    action: 'member.invite',
    createdAt: '2026-11-15T09:00:00.000Z'
  },
  {
    id: 'log-1002',
    projectId: 'project-alpha',
    operatorId: 'user-bob',
    action: 'repository.bind',
    createdAt: '2026-11-15T10:30:00.000Z'
  },
  {
    id: 'log-1003',
    projectId: 'project-beta',
    operatorId: 'user-carol',
    action: 'sop.publish',
    createdAt: '2026-11-15T11:20:00.000Z'
  },
  {
    id: 'log-1004',
    projectId: 'project-alpha',
    operatorId: 'user-alice',
    action: 'run.approve',
    createdAt: '2026-11-15T12:45:00.000Z'
  }
]);
