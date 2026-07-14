import { TestBed } from '@angular/core/testing';
import { unsavedChangesGuard, HasUnsavedChanges } from './unsaved-changes.guard';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('unsavedChangesGuard', () => {
  beforeEach(() => {
    vi.stubGlobal('confirm', vi.fn());
  });

  it('should allow deactivation if component has no unsaved changes', () => {
    const componentMock: HasUnsavedChanges = {
      hasUnsavedChanges: () => false
    };

    const result = TestBed.runInInjectionContext(() =>
      unsavedChangesGuard(componentMock, {} as any, {} as any, {} as any)
    );

    expect(result).toBe(true);
  });

  it('should ask confirmation if component has unsaved changes', () => {
    const componentMock: HasUnsavedChanges = {
      hasUnsavedChanges: () => true
    };
    const confirmSpy = vi.mocked(confirm).mockReturnValue(false);

    const result = TestBed.runInInjectionContext(() =>
      unsavedChangesGuard(componentMock, {} as any, {} as any, {} as any)
    );

    expect(confirmSpy).toHaveBeenCalledWith('Você tem alterações não salvas. Deseja sair?');
    expect(result).toBe(false);
  });
});
