import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowConferenceComponent } from './show-conference.component';

describe('ShowConferenceComponent', () => {
  let component: ShowConferenceComponent;
  let fixture: ComponentFixture<ShowConferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowConferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowConferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
