import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeFormComponent } from './about-me-form.component';

describe('AboutMeFormComponent', () => {
  let component: AboutMeFormComponent;
  let fixture: ComponentFixture<AboutMeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutMeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
