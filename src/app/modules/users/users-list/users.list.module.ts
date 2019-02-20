import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { ReactiveFormsModule} from '@angular/forms'
import { UsersList } from './users.list'
import { UserNew } from '../user-new/user.new'
import { UserSignIn } from '../user-signin/user.signin'
import { UserSignUp } from '../user-signup/user.signup'
import { UserReset } from '../user-reset/user.reset'
import { UserConfirm } from '../user-confirm/user.confirm'
import { UserAvatar } from '../user-avatar/user.avatar'

const routes: Routes = [
  {
    path: '',
    component: UsersList
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    UsersList,
    UserNew,
    UserSignIn,
    UserSignUp,
    UserReset,
    UserConfirm,
    UserAvatar
  ],
  entryComponents: [
    UsersList,
    UserNew,
    UserSignIn,
    UserSignUp,
    UserReset,
    UserConfirm,
    UserAvatar
  ]
})
export class UsersListModule {}
