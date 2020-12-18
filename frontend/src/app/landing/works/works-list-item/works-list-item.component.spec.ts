import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksListItemComponent } from './works-list-item.component';

describe('WorksListItemComponent', () => {
  let component: WorksListItemComponent;
  let fixture: ComponentFixture<WorksListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
