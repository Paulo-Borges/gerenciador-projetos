import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarComponent } from './shared/components/loading-bar/loading-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingBarComponent],
  template: `
    <app-loading-bar />
    <router-outlet />
  `,
  styles: []
})
export class AppComponent {}
