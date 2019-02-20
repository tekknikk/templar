import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAvatar } from './user.avatar';

describe('UserAvatarComponent', () => {
  let component: UserAvatar;
  let fixture: ComponentFixture<UserAvatar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAvatar ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAvatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
