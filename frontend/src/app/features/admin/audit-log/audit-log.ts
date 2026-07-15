import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdminApi } from '../../../core/services/admin-api';
import { IAuditLog } from '../../../core/models';

@Component({
  selector: 'app-audit-log',
  imports: [DatePipe, RouterLink, RouterLinkActive],
  templateUrl: './audit-log.html'
})
export class AuditLog implements OnInit {
  private adminApi = inject(AdminApi);
  private cdr = inject(ChangeDetectorRef);
  logs: IAuditLog[] = [];

  ngOnInit(): void {
    this.adminApi.getAuditLog().subscribe(logs => {
      this.logs = logs;
      this.cdr.markForCheck();
    });
  }
}
