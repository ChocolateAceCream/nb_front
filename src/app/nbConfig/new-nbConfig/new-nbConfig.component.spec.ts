import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNbConfigComponent } from './new-nbConfig.component';

describe('NewNbConfigComponent', () => {
  let component: NewNbConfigComponent;
  let fixture: ComponentFixture<NewNbConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNbConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNbConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
