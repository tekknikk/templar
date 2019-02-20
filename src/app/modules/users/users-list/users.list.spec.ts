import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UsersList } from './users.list'

describe('UsersPage', () => {
  let component: UsersList
  let fixture: ComponentFixture<UsersList>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersList ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersList)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
