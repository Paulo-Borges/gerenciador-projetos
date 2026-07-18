import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ITask } from '../models';
import { TaskApi } from '../services/task-api';

// TODO: remover constante
export const taskResolver: ResolveFn<ITask> = (route) => {
  const taskApi = inject(TaskApi);
  const taskId = route.paramMap.get('taskId')!;
  return taskApi.getById(taskId);
};
