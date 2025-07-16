import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteCaMoisComponent } from './vente-ca-mois.component';

describe('VenteCaMoisComponent', () => {
  let component: VenteCaMoisComponent;
  let fixture: ComponentFixture<VenteCaMoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenteCaMoisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenteCaMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
