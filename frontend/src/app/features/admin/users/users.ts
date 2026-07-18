import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { InitialsPipe } from '../../../shared/pipes/initials-pipe';
import { IUser } from '../../../core/models';

@Component({
  selector: 'app-users',
  imports: [InitialsPipe, RouterLink, RouterLinkActive],
  templateUrl: './users.html'
})
export class Users {
  //TODO: remover
  private readonly _activatedRoute = inject(ActivatedRoute);
  //TODO: mock de lista vazia
  users = signal<IUser[]>(this._activatedRoute.snapshot.data['users'] || []);
}
