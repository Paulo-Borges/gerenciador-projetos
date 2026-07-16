import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdminApi } from '../../../core/services/admin-api';

@Component({
  selector: 'app-audit-log',
  imports: [DatePipe, RouterLink, RouterLinkActive],
  templateUrl: './audit-log.html'
})
export class AuditLog {
  private adminApi = inject(AdminApi);
  logs = toSignal(this.adminApi.getAuditLog(), { initialValue: [] });
}
