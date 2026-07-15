import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Project } from '../models';
import { ProjectApi } from '../services/project-api';

export const projectResolver: ResolveFn<Project> = (route) => {
  const projectApi = inject(ProjectApi);
  const projectId = route.paramMap.get('projectId')!;
  return projectApi.getById(projectId);
};
