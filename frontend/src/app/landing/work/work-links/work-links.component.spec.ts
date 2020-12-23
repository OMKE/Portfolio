import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLinksComponent } from './work-links.component';

describe('WorkLinksComponent', () => {
  let component: WorkLinksComponent;
  let fixture: ComponentFixture<WorkLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
