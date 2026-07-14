import { Directive, inject, input, TemplateRef, ViewContainerRef, effect } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private authService = inject(AuthService);
  private hasView = false;

  hasRole = input.required<string>();

  constructor() {
    effect(() => {
      const requiredRole = this.hasRole();
      const user = this.authService.user();
      const shouldShow = user?.role === requiredRole;

      if (shouldShow && !this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!shouldShow && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    });
  }
}
