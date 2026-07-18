import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IProject } from '../models';
import { ProjectApi } from '../services/project-api';

//TODO: remover constante
export const projectResolver: ResolveFn<IProject> = (route) => {
  const projectApi = inject(ProjectApi);
  const projectId = route.paramMap.get('projectId')!;
  return projectApi.getById(projectId);
};
