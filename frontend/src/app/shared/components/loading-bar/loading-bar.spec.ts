import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingBar } from './loading-bar';

describe('LoadingBar', () => {
  let component: LoadingBar;
  let fixture: ComponentFixture<LoadingBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingBar],
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
});
