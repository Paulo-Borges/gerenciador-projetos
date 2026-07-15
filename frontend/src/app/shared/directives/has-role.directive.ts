import { Directive, inject, input, TemplateRef, ViewContainerRef, effect } from '@angular/core';
import { AuthManager } from '../../core/services/auth-manager';

@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private authManager = inject(AuthManager);
  private hasView = false;

  hasRole = input.required<string>();

  constructor() {
    effect(() => {
      const requiredRole = this.hasRole();
      const user = this.authManager.user();
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
