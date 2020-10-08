import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildConferenceComponent } from './build-conference.component';

describe('BuildConferenceComponent', () => {
  let component: BuildConferenceComponent;
  let fixture: ComponentFixture<BuildConferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildConferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildConferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
