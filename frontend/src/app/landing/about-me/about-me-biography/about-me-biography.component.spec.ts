import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeBiographyComponent } from './about-me-biography.component';

describe('AboutMeBiographyComponent', () => {
  let component: AboutMeBiographyComponent;
  let fixture: ComponentFixture<AboutMeBiographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutMeBiographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMeBiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
