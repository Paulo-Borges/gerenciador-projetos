import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Task } from '../models';
import { TaskService } from '../services/task.service';

export const taskResolver: ResolveFn<Task> = (route) => {
  const taskService = inject(TaskService);
  const taskId = route.paramMap.get('taskId')!;
  return taskService.getById(taskId);
};
