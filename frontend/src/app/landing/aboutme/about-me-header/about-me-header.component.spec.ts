import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeHeaderComponent } from './about-me-header.component';

describe('AboutMeHeaderComponent', () => {
  let component: AboutMeHeaderComponent;
  let fixture: ComponentFixture<AboutMeHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutMeHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
