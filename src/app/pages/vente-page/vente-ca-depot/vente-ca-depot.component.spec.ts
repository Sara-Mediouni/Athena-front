import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteCaDepotComponent } from './vente-ca-depot.component';

describe('VenteCaDepotComponent', () => {
  let component: VenteCaDepotComponent;
  let fixture: ComponentFixture<VenteCaDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenteCaDepotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenteCaDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
