import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../core/models';
import { HasUnsavedChanges } from '../../../core/guards/unsaved-changes.guard';

@Component({
  selector: 'app-task-detail',
  imports: [FormsModule],
  templateUrl: './task-detail.html',
  styleUrls: ['./task-detail.scss']
})
export class TaskDetail implements OnInit, HasUnsavedChanges {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private taskService = inject(TaskService);
  private cdr = inject(ChangeDetectorRef);

  task: Task | null = null;
  editedTask: Task | null = null;
  isDirty = false;
  isSaving = false;

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('taskId')!;
    this.taskService.getById(taskId).subscribe(task => {
      this.task = task;
      this.editedTask = { ...task };
      this.cdr.markForCheck();
    });
  }

  hasUnsavedChanges(): boolean {
    return this.isDirty;
  }

  markDirty(): void {
    this.isDirty = true;
    this.cdr.markForCheck();
  }

  save(): void {
    if (!this.editedTask) return;
    this.isSaving = true;
    this.cdr.markForCheck();
    this.taskService.update(this.editedTask.id, this.editedTask).subscribe({
      next: (updated) => {
        this.task = updated;
        this.isDirty = false;
        this.isSaving = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.isSaving = false;
        this.cdr.markForCheck();
      }
    });
  }

  close(): void {
    this.router.navigate([{ outlets: { detail: null } }], {
      relativeTo: this.route.parent
    });
  }
}
