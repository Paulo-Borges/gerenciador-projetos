import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IUser } from '../models';
import { AdminApi } from '../services/admin-api';

//TODO: remover tudo
export const usersResolver: ResolveFn<IUser[]> = () => {
  const adminApi = inject(AdminApi);
  return adminApi.getUsers();
};
