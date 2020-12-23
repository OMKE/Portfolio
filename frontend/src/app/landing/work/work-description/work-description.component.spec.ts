import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkDescriptionComponent } from './work-description.component';

describe('WorkDescriptionComponent', () => {
  let component: WorkDescriptionComponent;
  let fixture: ComponentFixture<WorkDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
