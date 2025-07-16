import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentePageComponent } from './vente-page.component';

describe('VentePageComponent', () => {
  let component: VentePageComponent;
  let fixture: ComponentFixture<VentePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
