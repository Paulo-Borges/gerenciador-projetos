import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Task } from '../models';
import { TaskApi } from '../services/task-api';

export const taskResolver: ResolveFn<Task> = (route) => {
  const taskApi = inject(TaskApi);
  const taskId = route.paramMap.get('taskId')!;
  return taskApi.getById(taskId);
};
