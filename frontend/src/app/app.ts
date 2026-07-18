import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBar } from './shared/components/loading-bar/loading-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingBar],
  template: `
    <!-- TODO: Remover e deixar apenas o login -->
    <app-loading-bar />
    <router-outlet />
  `,
  styles: []
})
export class App { }
