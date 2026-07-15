import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Task } from '../models';
import { ProjectApi } from '../services/project-api';

export const projectTasksResolver: ResolveFn<Task[]> = (route) => {
  const projectApi = inject(ProjectApi);
  const projectId = route.parent?.paramMap.get('projectId') || route.paramMap.get('projectId')!;
  return projectApi.getTasks(projectId);
};
