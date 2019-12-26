import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNbConfigComponent } from './all-nbConfig.component';

describe('AllNbConfigComponent', () => {
  let component: AllNbConfigComponent;
  let fixture: ComponentFixture<AllNbConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllNbConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllNbConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
