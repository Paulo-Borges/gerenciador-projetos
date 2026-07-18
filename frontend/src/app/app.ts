import { Component } from '@angular/core';
import { Login } from './features/auth/login/login';
import { MainLayout } from './shared/layouts/main-layout/main-layout';
import { Board } from './features/project/board/board';
import { Backlog } from './features/project/backlog/backlog';
import { ProjectSettings } from './features/project/project-settings/project-settings';
import { Members } from './features/members/members';
import { NotFound } from './features/not-found/not-found';
import { TaskDetail } from './features/project/task-detail/task-detail';
import { LoadingBar } from './shared/components/loading-bar/loading-bar';
import { Billing } from './features/settings/billing/billing';
import { Profile } from './features/settings/profile/profile';
import { Users } from './features/admin/users/users';
import { AuditLog } from './features/admin/audit-log/audit-log';

@Component({
  selector: 'app-root',
  imports: [Login, AuditLog],
  template: `
    <app-audit-log />
  `,
  styles: []
})
export class App { }
