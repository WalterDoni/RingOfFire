import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireAnimationComponent } from './fire-animation.component';

describe('FireAnimationComponent', () => {
  let component: FireAnimationComponent;
  let fixture: ComponentFixture<FireAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FireAnimationComponent]
    });
    fixture = TestBed.createComponent(FireAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
