import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { AuditLog } from '../../../core/models';

@Component({
  selector: 'app-audit-log',
  imports: [DatePipe, RouterLink, RouterLinkActive],
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss']
})
export class AuditLogComponent implements OnInit {
  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);
  logs: AuditLog[] = [];

  ngOnInit(): void {
    this.adminService.getAuditLog().subscribe(logs => {
      this.logs = logs;
      this.cdr.markForCheck();
    });
  }
}
