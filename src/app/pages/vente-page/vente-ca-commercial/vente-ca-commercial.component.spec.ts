import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteCaCommercialComponent } from './vente-ca-commercial.component';

describe('VenteCaCommercialComponent', () => {
  let component: VenteCaCommercialComponent;
  let fixture: ComponentFixture<VenteCaCommercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenteCaCommercialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenteCaCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
