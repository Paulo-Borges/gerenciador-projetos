import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { IAuditLog } from '../../../core/models';

@Component({
  selector: 'app-audit-log',
  imports: [DatePipe, RouterLink, RouterLinkActive],
  templateUrl: './audit-log.html'
})
export class AuditLog {
  //TODO: remover
  private readonly _activatedRoute = inject(ActivatedRoute);
  //TODO: mock de lista vazia
  logs = signal<IAuditLog[]>(this._activatedRoute.snapshot.data['logs'] || []);
}
