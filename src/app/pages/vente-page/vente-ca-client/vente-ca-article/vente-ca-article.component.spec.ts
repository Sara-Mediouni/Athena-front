import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteCaArticleComponent } from './vente-ca-article.component';

describe('VenteCaArticleComponent', () => {
  let component: VenteCaArticleComponent;
  let fixture: ComponentFixture<VenteCaArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenteCaArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenteCaArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
