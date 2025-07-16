import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntreprisePageComponent } from './add-entreprise-page.component';

describe('AddEntreprisePageComponent', () => {
  let component: AddEntreprisePageComponent;
  let fixture: ComponentFixture<AddEntreprisePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEntreprisePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEntreprisePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
