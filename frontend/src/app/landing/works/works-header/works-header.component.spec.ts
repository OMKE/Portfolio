import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksHeaderComponent } from './works-header.component';

describe('WorksHeaderComponent', () => {
  let component: WorksHeaderComponent;
  let fixture: ComponentFixture<WorksHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
