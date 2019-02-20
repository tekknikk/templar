import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UserNew } from './user.new'

describe('UserNew', () => {
  let component: UserNew
  let fixture: ComponentFixture<UserNew>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNew ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNew)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
