import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IAuditLog } from '../models';
import { AdminApi } from '../services/admin-api';

//TODO: remover tudo
export const auditLogResolver: ResolveFn<IAuditLog[]> = () => {
  const adminApi = inject(AdminApi);
  return adminApi.getAuditLog();
};
