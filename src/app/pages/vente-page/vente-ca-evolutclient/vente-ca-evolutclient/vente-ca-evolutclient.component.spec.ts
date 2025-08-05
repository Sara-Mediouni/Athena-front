import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteCaEvolutclientComponent } from './vente-ca-evolutclient.component';

describe('VenteCaEvolutclientComponent', () => {
  let component: VenteCaEvolutclientComponent;
  let fixture: ComponentFixture<VenteCaEvolutclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenteCaEvolutclientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenteCaEvolutclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
