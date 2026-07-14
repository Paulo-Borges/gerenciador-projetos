import { Routes } from '@angular/router';
import { projectResolver } from '../../core/resolvers/project.resolver';
import { projectTasksResolver } from '../../core/resolvers/project-tasks.resolver';
import { unsavedChangesGuard } from '../../core/guards/unsaved-changes.guard';

export const PROJECT_ROUTES: Routes = [
  {
    path: '',
    resolve: { project: projectResolver },
    children: [
      { path: '', redirectTo: 'board', pathMatch: 'full' },
      {
        path: 'board',
        loadComponent: () => import('./board/board.component').then((m) => m.BoardComponent),
        resolve: { tasks: projectTasksResolver },
        title: 'Board',
      },
      {
        path: 'backlog',
        loadComponent: () => import('./backlog/backlog.component').then((m) => m.BacklogComponent),
        resolve: { tasks: projectTasksResolver },
        title: 'Backlog',
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./project-settings/project-settings.component').then(
            (m) => m.ProjectSettingsComponent,
          ),
        title: 'Configurações do Projeto',
      },
      {
        path: 'task/:taskId',
        outlet: 'detail',
        loadComponent: () =>
          import('./task-detail/task-detail.component').then((m) => m.TaskDetailComponent),
        canDeactivate: [unsavedChangesGuard],
        title: 'Detalhes da Task',
      },
    ],
  },
];
