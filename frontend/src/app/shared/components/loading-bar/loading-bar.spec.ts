import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingBar } from './loading-bar';
import { vi } from 'vitest';
import { provideRouter, Router } from '@angular/router';
import { Component } from '@angular/core';

describe('LoadingBar', () => {
  let component: LoadingBar;
  let fixture: ComponentFixture<LoadingBar>;

  @Component({ template: '' })
  class ComponenteDestinoFalso {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingBar],
      providers: [provideRouter([{ path: 'rota-sucesso', component: ComponenteDestinoFalso }])],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente com sucesso', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o loadingBar (signal = true)', () => {
    const html: HTMLElement = fixture.nativeElement;
    const loadingContainer = html.querySelector('[data-testid="loading-container"]');
    expect(loadingContainer).toBeTruthy();
  });

  it('deve remover a barra da tela quando o signal isLoading for false', () => {
    component.isLoading.set(false);

    fixture.detectChanges();
    const html: HTMLElement = fixture.nativeElement;
    const loadingContainer = html.querySelector('[data-testid="loading-container"]');
    expect(loadingContainer).toBeNull();
  });

  it('deve exibir a barra ao iniciar a navegação e esconder 300ms após o sucesso (NavigationEnd)', async () => {
    vi.useFakeTimers();

    const router = TestBed.inject(Router);

    component.isLoading.set(false);
    fixture.detectChanges();

    const promessaNavegacao = router.navigate(['/rota-sucesso']);
    fixture.detectChanges();

    let barra = fixture.nativeElement.querySelector('[data-testid="loading-container"]');
    expect(barra).toBeTruthy();

    await promessaNavegacao;

    vi.advanceTimersByTime(300);
    fixture.detectChanges();

    barra = fixture.nativeElement.querySelector('[data-testid="loading-container"]');
    expect(barra).toBeNull();

    vi.useRealTimers();
  });

  it('deve exibir a barra e esconder 300ms após o erro (NavigationError)', async () => {
    vi.useFakeTimers();

    const router = TestBed.inject(Router);

    component.isLoading.set(false);
    fixture.detectChanges();

    const promessaErro = router.navigate(['/rota-inesistente']).catch(() => {});
    fixture.detectChanges();

    let barra = fixture.nativeElement.querySelector('[data-testid="loading-container"]');
    expect(barra).toBeTruthy();

    await promessaErro;

    vi.advanceTimersByTime(300);
    fixture.detectChanges();

    barra = fixture.nativeElement.querySelector('[data-testid="loading-container"]');
    expect(barra).toBeNull();

    vi.useRealTimers();
  });
});
