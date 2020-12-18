import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksListMainItemComponent } from './works-list-main-item.component';

describe('WorksListMainItemComponent', () => {
  let component: WorksListMainItemComponent;
  let fixture: ComponentFixture<WorksListMainItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksListMainItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksListMainItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
