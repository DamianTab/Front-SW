import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotExistingPageComponent } from './not-existing-page.component';

describe('NotExistingPageComponent', () => {
  let component: NotExistingPageComponent;
  let fixture: ComponentFixture<NotExistingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotExistingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotExistingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
