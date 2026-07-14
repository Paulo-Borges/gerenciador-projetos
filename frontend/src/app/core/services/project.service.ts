import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, Task, User } from '../models';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  getMembers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/members`);
  }

  getById(projectId: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${projectId}`);
  }

  getTasks(projectId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/projects/${projectId}/tasks`);
  }

  createTask(projectId: string, task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/projects/${projectId}/tasks`, task);
  }
}
