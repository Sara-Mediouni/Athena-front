import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseStatsComponent } from './entreprise-stats.component';

describe('EntrepriseStatsComponent', () => {
  let component: EntrepriseStatsComponent;
  let fixture: ComponentFixture<EntrepriseStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepriseStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepriseStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
