import { Component } from '@angular/core'
import {UserSignIn} from '../users/user-signin/user.signin'
import {UserSignUp} from '../users/user-signup/user.signup'

import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router'
import { ModalController } from '@ionic/angular'
import { environment } from '../../../environments/environment'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
      private router: Router,
      private modalController: ModalController
  ) { }

  ngOnInit() {

  }

  showIntercom() {
    (<any>window).Intercom('boot', {
      app_id: environment.intercomAppId,
      //Logged out user so may not have any user related info
    });
  }

  async signIn() {
    const modal = await this.modalController.create({
      component: UserSignIn
    })
    return await modal.present()
  }

  async signUp() {
    const modal = await this.modalController.create({
      component: UserSignUp
    })
    return await modal.present()
  }

}
