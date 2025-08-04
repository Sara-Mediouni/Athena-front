import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteCaClientComponent } from './vente-ca-client.component';

describe('VenteCaClientComponent', () => {
  let component: VenteCaClientComponent;
  let fixture: ComponentFixture<VenteCaClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenteCaClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenteCaClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
