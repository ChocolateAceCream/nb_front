import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbConfigComponent } from './nbConfig.component';

describe('NbConfigComponent', () => {
  let component: NbConfigComponent;
  let fixture: ComponentFixture<NbConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
