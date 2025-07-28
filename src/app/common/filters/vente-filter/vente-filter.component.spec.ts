import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteFilterComponent } from './vente-filter.component';

describe('VenteFilterComponent', () => {
  let component: VenteFilterComponent;
  let fixture: ComponentFixture<VenteFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenteFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenteFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
