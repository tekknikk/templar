import { Component, OnInit } from '@angular/core';
import { AmplifyService }  from 'aws-amplify-angular';
import { Router } from '@angular/router'
import { ModalController, LoadingController } from '@ionic/angular'

import { UserConfirm } from '../user-confirm/user.confirm'
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-user-home',
  templateUrl: './user.home.html',
  styleUrls: ['./user.home.scss'],
})
export class UserHome implements OnInit {
user:any
status: string
supplierId: string
role: string
error: any

  constructor(
    private loadingController: LoadingController,
    private modalController: ModalController,
    private router: Router,
    private amplifyService: AmplifyService
    // private intercom: Intercom
  ) {
    this.amplifyService = amplifyService
  }

  ngOnInit() {
    // this.presentLoading()
    this.amplifyService.auth().currentAuthenticatedUser({bypassCache: true})
      .then(user => {
        this.user = user
        this.role = user.attributes['custom:company_role']
        this.status = user.attributes['custom:user_status']
        console.log('***User Home***')
        console.log('user: ', user)
        console.log('user.home.status: ', this.status)
        console.log('user.home.role: ', this.role)

        // Recapture lost flow
        if(this.status === 'UserSignUp') {
          this.confirmModal(this.user)
        }

      })
      .catch(err => {
        if (err.message) {
          this.error = err.message
        } else {
          this.error = err
        }
     })
  }

  showIntercom() {
    (<any>window).Intercom('boot', {
      app_id: environment.intercomAppId,
      email: this.user.username
      //Logged out user so may not have any user related info
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 1000
    })
    return await loading.present()
  }

  dismiss() {
    this.modalController.dismiss()
  }

  signOut() {
    this.amplifyService.auth().signOut()
      .then(() => {
        this.router.navigate(['/home']);
      })
  }

  raw() {
    if (this.user) return JSON.stringify(this.user)
  }

  async confirmModal(user) {
    const modal = await this.modalController.create({
      component: UserConfirm,
      componentProps: { user: user },
      backdropDismiss: false
    })
    return await modal.present()
  }

}
