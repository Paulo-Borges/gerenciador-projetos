import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Project } from '../models';
import { ProjectService } from '../services/project.service';

export const projectResolver: ResolveFn<Project> = (route) => {
  const projectService = inject(ProjectService);
  const projectId = route.paramMap.get('projectId')!;
  return projectService.getById(projectId);
};
