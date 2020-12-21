import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChasingDotsLoaderComponent } from './chasing-dots-loader.component';

describe('ChasingDotsLoaderComponent', () => {
  let component: ChasingDotsLoaderComponent;
  let fixture: ComponentFixture<ChasingDotsLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChasingDotsLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChasingDotsLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
