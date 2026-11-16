export class AuthorizationError extends Error {
  constructor(message = 'You are not allowed to access this project') {
    super(message);
    this.name = 'AuthorizationError';
    this.code = 'FORBIDDEN';
    this.statusCode = 403;
  }
}

function targetProject(viewer, requestedProjectId) {
  if (viewer.role === 'admin') {
    return requestedProjectId || viewer.projectId;
  }

  if (requestedProjectId && requestedProjectId !== viewer.projectId) {
    throw new AuthorizationError();
  }

  return viewer.projectId;
}

export function listAuditLogs({ logs, viewer, projectId }) {
  const visibleProjectId = targetProject(viewer, projectId);

  if (!visibleProjectId) {
    return [];
  }

  return logs
    .filter((entry) => entry.projectId === visibleProjectId)
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
    .map((entry) => ({ ...entry }));
}
