import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users-list',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomePageModule'
  },
  {
    path: 'users-list',
    loadChildren: './modules/users/users-list/users.list.module#UsersListModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
