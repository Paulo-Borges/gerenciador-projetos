import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Task } from '../models';
import { ProjectService } from '../services/project.service';

export const projectTasksResolver: ResolveFn<Task[]> = (route) => {
  const projectService = inject(ProjectService);
  const projectId = route.parent?.paramMap.get('projectId') || route.paramMap.get('projectId')!;
  return projectService.getTasks(projectId);
};
