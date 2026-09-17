import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntradaQr } from './entrada-qr';

describe('EntradaQr', () => {
  let component: EntradaQr;
  let fixture: ComponentFixture<EntradaQr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntradaQr],
    }).compileComponents();

    fixture = TestBed.createComponent(EntradaQr);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
