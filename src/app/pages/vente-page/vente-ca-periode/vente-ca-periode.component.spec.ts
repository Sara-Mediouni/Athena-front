import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteCaPeriodeComponent } from './vente-ca-periode.component';

describe('VenteCaPeriodeComponent', () => {
  let component: VenteCaPeriodeComponent;
  let fixture: ComponentFixture<VenteCaPeriodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenteCaPeriodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenteCaPeriodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
