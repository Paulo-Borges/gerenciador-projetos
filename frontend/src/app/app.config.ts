import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withPreloading,
  TitleStrategy,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { CustomPreloadingStrategy } from './core/strategies/custom-preloading-strategy';
import { CustomTitleStrategy } from './core/strategies/custom-title-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      // TODO: Remover preloading
      withPreloading(CustomPreloadingStrategy),
      // TODO: Remover in-memory scrolling
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      // TODO: Remover view transitions
      withViewTransitions(),
    ),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    // TODO: Remover
    { provide: TitleStrategy, useClass: CustomTitleStrategy },
  ],
};
