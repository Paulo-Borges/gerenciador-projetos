import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskApi } from '../../../core/services/task-api';
import { ITask } from '../../../core/models';
import { HasUnsavedChanges } from '../../../core/guards/unsaved-changes-guard';

@Component({
  selector: 'app-task-detail',
  imports: [FormsModule],
  templateUrl: './task-detail.html',
  styleUrls: ['./task-detail.scss']
})
export class TaskDetail implements OnInit, HasUnsavedChanges {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private taskApi = inject(TaskApi);

  task = signal<ITask | null>(null);
  editedTask = signal<ITask | null>(null);
  isDirty = signal(false);
  isSaving = signal(false);

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('taskId')!;
    this.taskApi.getById(taskId).subscribe(task => {
      this.task.set(task);
      this.editedTask.set({ ...task });
    });
  }

  hasUnsavedChanges(): boolean {
    return this.isDirty();
  }

  markDirty(): void {
    this.isDirty.set(true);
  }

  save(): void {
    const currentEdited = this.editedTask();
    if (!currentEdited) return;
    this.isSaving.set(true);
    this.taskApi.update(currentEdited.id, currentEdited).subscribe({
      next: (updated) => {
        this.task.set(updated);
        this.isDirty.set(false);
        this.isSaving.set(false);
      },
      error: () => {
        this.isSaving.set(false);
      }
    });
  }

  close(): void {
    this.router.navigate([{ outlets: { detail: null } }], {
      relativeTo: this.route.parent
    });
  }
}
