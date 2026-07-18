import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from '../../../core/models';
import { TaskApi } from '../../../core/services/task-api';
import { HasUnsavedChanges } from '../../../core/guards/unsaved-changes-guard';

@Component({
  selector: 'app-task-detail',
  imports: [FormsModule],
  templateUrl: './task-detail.html',
  styleUrls: ['./task-detail.scss']
})
export class TaskDetail implements OnInit, HasUnsavedChanges {
  //TODO: remover ActivatedRoute
  private readonly _activatedRoute = inject(ActivatedRoute);
  //TODO: remover Router
  private readonly _router = inject(Router);
  private readonly _taskApi = inject(TaskApi);

  //TODO: deixar um objeto de task mockado nesse signal
  task = signal<ITask | null>(null);
  editedTask = signal<ITask | null>(null);
  isDirty = signal(false);
  isSaving = signal(false);

  ngOnInit(): void {
    //TODO: remover snapshot e if
    const task = this._activatedRoute.snapshot.data['task'];
    if (task) {
      this.task.set(task);
      this.editedTask.set({ ...task });
    }
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
    this._taskApi.update(currentEdited.id, currentEdited).subscribe({
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
    //TODO: remover
    this._router.navigate([{ outlets: { detail: null } }], {
      relativeTo: this._activatedRoute.parent
    });
  }
}
