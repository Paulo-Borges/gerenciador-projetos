import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models';
import { AuditLog } from '../models';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly apiUrl = 'http://localhost:3000/api/admin';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getAuditLog(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.apiUrl}/audit-log`);
  }
}
