import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkImageContainerComponent } from './work-image-container.component';

describe('WorkImageContainerComponent', () => {
  let component: WorkImageContainerComponent;
  let fixture: ComponentFixture<WorkImageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkImageContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkImageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
