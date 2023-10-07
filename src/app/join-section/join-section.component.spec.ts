import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinSectionComponent } from './join-section.component';

describe('JoinSectionComponent', () => {
  let component: JoinSectionComponent;
  let fixture: ComponentFixture<JoinSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinSectionComponent]
    });
    fixture = TestBed.createComponent(JoinSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
