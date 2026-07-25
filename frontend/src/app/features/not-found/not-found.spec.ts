import { provideRouter } from '@angular/router';
import { NotFound } from './not-found';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('NotFound Component', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('deve criar um componente com sucesso', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o título de Página não encontrada', () => {
    const html: HTMLElement = fixture.nativeElement;
    const tituloH1 = html.querySelector('h1');

    expect(tituloH1?.textContent).toBe('Página não encontrada');
  });

  it('deve ter um link de redirecionamento para a páginal inicial (/)', () => {
    const html: HTMLElement = fixture.nativeElement;
    const linkA = html.querySelector('a');

    expect(linkA?.getAttribute('href')).toBe('/');
  });
});
