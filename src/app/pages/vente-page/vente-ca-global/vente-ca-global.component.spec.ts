import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteCaGlobalComponent } from './vente-ca-global.component';

describe('VenteCaMoisComponent', () => {
  let component: VenteCaGlobalComponent;
  let fixture: ComponentFixture<VenteCaGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenteCaGlobalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenteCaGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
