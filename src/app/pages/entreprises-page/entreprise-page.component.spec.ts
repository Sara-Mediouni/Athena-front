import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreprisePageComponent } from './entreprise-page.component';

describe('EntreprisePageComponent', () => {
  let component: EntreprisePageComponent;
  let fixture: ComponentFixture<EntreprisePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntreprisePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntreprisePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
