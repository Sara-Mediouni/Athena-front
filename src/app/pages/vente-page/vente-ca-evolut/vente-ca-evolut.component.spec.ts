import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteCaEvolutComponent } from './vente-ca-evolut.component';

describe('VenteCaEvolutComponent', () => {
  let component: VenteCaEvolutComponent;
  let fixture: ComponentFixture<VenteCaEvolutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenteCaEvolutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenteCaEvolutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
