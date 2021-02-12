import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceTableComponent } from './experience-table.component';

describe('ExperienceTableComponent', () => {
  let component: ExperienceTableComponent;
  let fixture: ComponentFixture<ExperienceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
